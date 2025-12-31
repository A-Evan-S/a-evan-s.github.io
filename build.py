import os
import sys
import shutil
import markdown
import frontmatter
import re
import latex2mathml.converter

SRC_DIR = "site"
PAGES_DIR = os.path.join(SRC_DIR, "pages")
TEMPLATES_DIR = os.path.join(SRC_DIR, "templates")
ASSETS_DIR = os.path.join(SRC_DIR, "assets")
POSTS_DIR = os.path.join(PAGES_DIR, "posts")
DIST_DIR = "dist"
DRAFTS_DIR = os.path.join(PAGES_DIR, "drafts")

TITLE_ROOT = 'evan.schor'

def main(include_drafts=False):
    clean_dist()
    build_pages(include_drafts)
    copy_assets()
    copy_cname()

def clean_dist():
    if os.path.exists(DIST_DIR):
        shutil.rmtree(DIST_DIR)
    os.makedirs(DIST_DIR)
    posts_dir = os.path.join(DIST_DIR, 'posts')
    os.makedirs(posts_dir)

def build_pages(include_drafts=False):
    with open(os.path.join(TEMPLATES_DIR, "main.html"), "r", encoding="utf-8") as f:
        template = f.read()

    posts = load_posts(POSTS_DIR, is_draft=False)
    if include_drafts:
        drafts = load_posts(DRAFTS_DIR, is_draft=True)
        for draft in drafts:
            draft['title'] = '[DRAFT] ' + draft['title']
        posts.extend(drafts)
    posts.sort(key=lambda post: post['date'], reverse=True)

    for post in posts:
        generate_post_page(template, post, posts)
    
    generate_home_page(template, posts)
    generate_about_page(template, posts)
    generate_post_index(template, posts)
    generate_404_page()

def shorten_title(orig_title, max_length=40):
    if len(orig_title) < max_length:
        return orig_title
    short_title = ''
    words = orig_title.split()
    while len(short_title) + len(words[0]) + 4 < max_length:
        short_title += ' ' + words.pop(0)
    return short_title.rstrip('!,.;-') + '...'

def generate_404_page():
    template_404 = os.path.join(TEMPLATES_DIR, '404.html')
    template_404 = template_404.replace("{{title}}", '404' + ' | ' + TITLE_ROOT)
    shutil.copy(template_404, DIST_DIR)

def write_html(out_path, html_content):
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(html_content)

def add_nav_to_template(template, posts, current_page=''):
    default_nav = f'''<ul>
                        <li>
                            <a href="/" {'class="active"' if current_page == 'home' else ''}>Home</a>
                        </li>
                        <li>
                            <a href="/posts" {'class="active"' if current_page == 'posts' else ''}>Posts</a>
                                <ul class="sublist">
                                    {{{{recent-posts}}}}
                                </ul>
                        </li>
                        <li>
                            <a href="/about" {'class="active"' if current_page == 'about' else ''}>About</a>
                        </li>
                    </ul>'''
    template = template.replace('{{navigation}}', default_nav)
    post_elements = []
    for post in posts:
        post_url = '/posts/' + post['slug']
        short_title = shorten_title(post['title'])
        post_elements.append(f'''<li><a href="{post_url}" {'class="active"' if current_page == post['title'] else ''}>{short_title}</a></li>''')
    return template.replace('{{recent-posts}}', '\n'.join(post_elements))

def generate_post_index(template, posts):
        out_path = os.path.join(DIST_DIR, 'posts', 'index.html')
        html_content = '\n'.join(make_post_entry(post) for post in posts)
        template = add_nav_to_template(template, posts, 'posts')
        rendered = template.replace("{{content}}", html_content)
        rendered = rendered.replace("{{title}}", 'Posts' + ' | ' + TITLE_ROOT)
        rendered = rendered.replace("{{description}}", 'Posts listing')
        write_html(out_path, rendered)

def make_post_entry(post):
    date_obj = post['date']
    iso_date = date_obj.isoformat()
    display_date = date_obj.strftime('%B %d, %Y')
    post_url = '/posts/' + post['slug']
    post_entry = f'''
    <div class="posts-list-entry">
        <div class="post-header">
            <h3 class="post-title"><a href="{post_url}">{post["title"]}</a></h3>
            <time class="post-date" datetime="{iso_date}">{display_date}</time>
        </div>
        <p class="post-summary">{post["summary"]}</p>
    </div>
    '''
    return post_entry

def generate_home_page(template, posts):
    md_path = os.path.join(PAGES_DIR, 'index.md')
    out_path = os.path.join(DIST_DIR, 'index.html')
    main_page = frontmatter.load(md_path)
    html_content = process_markdown(main_page.content)
    template = add_nav_to_template(template, posts, 'home')
    rendered = template.replace("{{content}}", html_content)
    rendered = rendered.replace("{{title}}", TITLE_ROOT)
    rendered = rendered.replace("{{description}}", 'Evan Schor\'s personal website')
    write_html(out_path, rendered)

def generate_about_page(template, posts):
    md_path = os.path.join(PAGES_DIR, 'about.md')
    about_dir = os.path.join(DIST_DIR, 'about')
    os.makedirs(about_dir)
    out_path = os.path.join(about_dir, 'index.html')
    main_page = frontmatter.load(md_path)
    html_content = process_markdown(main_page.content)
    template = add_nav_to_template(template, posts, 'about')
    rendered = template.replace("{{content}}", html_content)
    rendered = rendered.replace("{{title}}", 'About' + ' | ' + TITLE_ROOT)
    rendered = rendered.replace("{{description}}", 'About Evan Schor')
    write_html(out_path, rendered)

def load_posts(directory, is_draft):
    posts = []
    for post_folder in os.listdir(directory):
        post_path = os.path.join(directory, post_folder)
        for filename in os.listdir(post_path):
            if filename.endswith(".md"):
                md_path = os.path.join(post_path, filename)
                post = frontmatter.load(md_path)
                post.content = re.sub(r'(?<!\\)\$\$([^\$]+)\$\$', convert_block_math, post.content)
                post.content = re.sub(r'(?<!\\)\$([^\$]+)\$', convert_inline_math, post.content)
                post.content = post.content.replace(r'\$', '$')
                post['slug'] = filename_from_title(post['title'])
                post['orig_dir'] = post_path
                # post['url'] = '/posts/' + post['slug'] + '/index.html'
                post['draft'] = is_draft
                posts.append(post)
    return posts

def convert_block_math(match):
    return latex2mathml.converter.convert(match.group(1), display='block')

def convert_inline_math(match):
    return latex2mathml.converter.convert(match.group(1))
    
def generate_post_page(template, post, posts):
    post_dir = os.path.join(DIST_DIR, 'posts', post['slug'])
    os.makedirs(post_dir)
    for filename in os.listdir(post['orig_dir']):
        if not filename.endswith('.md'):
            source_path = os.path.join(post['orig_dir'], filename)
            destination_path = os.path.join(post_dir, filename)
            shutil.copy2(source_path, destination_path)

    out_path = os.path.join(post_dir, 'index.html')
    date_obj = post['date']
    iso_date = date_obj.isoformat()
    display_date = date_obj.strftime('%B %d, %Y')
    html_title = f'''
    <div class="post-header">
    <h1 class="post-title">{post["title"]}</h1>
    <time class="post-date" datetime="{iso_date}">{display_date}</time>
    </div>
    '''
    html_content = process_markdown(post.content)
    html_content = html_title + html_content
    template = add_nav_to_template(template, posts, post['title'])
    rendered = template.replace("{{content}}", html_content)
    rendered = rendered.replace("{{title}}", post['title'] + ' | ' + TITLE_ROOT)
    rendered = rendered.replace("{{description}}", post['summary'])
    write_html(out_path, rendered)

def process_markdown(markdown_content):
    html_content = markdown.markdown(markdown_content, extensions=['toc', 'subscript', 'superscript', 'footnotes', 'tables', 'fenced_code', 'codehilite', 'attr_list'])
    html_content = re.sub(
        r'(<table>.*?</table>)',
        r'<div class="table-wrapper">\1</div>',
        html_content,
        flags=re.DOTALL
    )
    html_content = re.sub(
        r'(<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">.*?</math>)',
        r'<div class="math-wrapper">\1</div>',
        html_content,
        flags=re.DOTALL
    )
    return html_content


def filename_from_title(title, max_length=50):
    slug = title.lower()
    slug = slug.replace(' ', '-').replace('_', '-')
    slug = re.sub(r'[^a-z0-9-]', '', slug)
    slug = re.sub(r'-+', '-', slug)
    slug = slug.strip('-')
    slug = slug[:max_length].rstrip('-')
    return slug

def copy_assets():
    if os.path.exists(ASSETS_DIR):
        shutil.copytree(ASSETS_DIR, os.path.join(DIST_DIR, "assets"))

def copy_cname():
    if os.path.exists("CNAME"):
        shutil.copy("CNAME", os.path.join(DIST_DIR, "CNAME"))

if __name__ == "__main__":
    include_drafts = '--drafts' in sys.argv
    main(include_drafts=include_drafts)
