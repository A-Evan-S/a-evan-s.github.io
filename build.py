import os
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

TITLE_ROOT = 'evan.schor'

def main():
    clean_dist()
    build_pages()
    copy_assets()
    copy_cname()

def clean_dist():
    if os.path.exists(DIST_DIR):
        shutil.rmtree(DIST_DIR)
    os.makedirs(DIST_DIR)
    posts_dir = os.path.join(DIST_DIR, 'posts')
    os.makedirs(posts_dir)

def build_pages():
    with open(os.path.join(TEMPLATES_DIR, "main.html"), "r", encoding="utf-8") as f:
        template = f.read()

    posts = load_posts()
    template = add_recent_posts_to_template(template, posts)

    for post in posts:
        generate_post_page(template, post)
    
    generate_home_page(template, posts)
    generate_about_page(template)
    generate_post_index(template, posts)
    generate_404_page()

def add_recent_posts_to_template(template, posts):
    post_elements = []
    for post in posts:
        post_elements.append(f'<li><a href="{post["url"]}">{post["title"]}</a></li>')
    return template.replace('{{recent-posts}}', '\n'.join(post_elements))

def generate_404_page():
    template_404 = os.path.join(TEMPLATES_DIR, '404.html')
    template_404 = template_404.replace("{{title}}", TITLE_ROOT + ' | ' + '404')
    shutil.copy(template_404, DIST_DIR)

def generate_post_index(template, posts):
        out_path = os.path.join(DIST_DIR, 'posts.html')
        html_content = '<h1 class="post-title">Posts</h1>' + '\n'.join(make_post_entry(post) for post in posts)
        rendered = template.replace("{{content}}", html_content)
        rendered = rendered.replace("{{title}}", TITLE_ROOT + ' | ' + 'Posts')
        rendered = rendered.replace("{{description}}", 'Posts listing')
        write_html(out_path, rendered)

def write_html(out_path, html_content):
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(html_content)

def make_post_entry(post):
    date_obj = post['date']
    iso_date = date_obj.isoformat()
    display_date = date_obj.strftime('%B %d, %Y')
    post_entry = f'''
    <div class="posts-list-entry">
        <div class="post-header">
            <h3 class="post-title"><a href="{post["url"]}">{post["title"]}</a></h3>
            <time class="post-date" datetime="{iso_date}">{display_date}</time>
        </div>
        <p class="post-summary">{post["summary"]}</p>
    </div>
    '''
    return post_entry
# href="{post["url"]}" 

def generate_home_page(template, posts):
    md_path = os.path.join(PAGES_DIR, 'index.md')
    out_path = os.path.join(DIST_DIR, 'index.html')
    main_page = frontmatter.load(md_path)
    html_content = markdown.markdown(main_page.content, extensions=['fenced_code', 'attr_list'])
    rendered = template.replace("{{content}}", html_content)
    rendered = rendered.replace("{{title}}", TITLE_ROOT)
    rendered = rendered.replace("{{description}}", 'Evan Schor\'s personal website')
    write_html(out_path, rendered)

def generate_about_page(template):
    md_path = os.path.join(PAGES_DIR, 'about.md')
    out_path = os.path.join(DIST_DIR, 'about.html')
    main_page = frontmatter.load(md_path)
    html_content = markdown.markdown(main_page.content, extensions=['fenced_code', 'attr_list'])
    rendered = template.replace("{{content}}", html_content)
    rendered = rendered.replace("{{title}}", TITLE_ROOT + ' | ' + 'About')
    rendered = rendered.replace("{{description}}", 'About Evan Schor')
    write_html(out_path, rendered)

def load_posts():
    posts = []
    for filename in os.listdir(POSTS_DIR):
        if filename.endswith(".md"):
            md_path = os.path.join(POSTS_DIR, filename)
            post = frontmatter.load(md_path)
            post.content = re.sub(r'(?<!\\)\$\$([^\$]+)\$\$', convert_block_math, post.content)
            post.content = re.sub(r'(?<!\\)\$([^\$]+)\$', convert_inline_math, post.content)
            post.content = post.content.replace(r'\$', '$')
            post['slug'] = filename_from_title(post['title'])
            post['url'] = '/posts/' + post['slug'] + '.html'
            post['date'], '%Y-%m-%d'
            posts.append(post)
    return posts

def convert_block_math(match):
    return latex2mathml.converter.convert(match.group(1), display='block')

def convert_inline_math(match):
    return latex2mathml.converter.convert(match.group(1))
    
def generate_post_page(template, post):
    base = post['slug'] + ".html"
    out_path = os.path.join(DIST_DIR, 'posts', base)
    date_obj = post['date']
    iso_date = date_obj.isoformat()
    display_date = date_obj.strftime('%B %d, %Y')
    html_title = f'''
    <div class="post-header">
    <h1 class="post-title">{post["title"]}</h1>
    <time class="post-date" datetime="{iso_date}">{display_date}</time>
    </div>
    '''
    html_content = markdown.markdown(post.content, extensions=['fenced_code', 'attr_list'])
    html_content = html_title + html_content
    rendered = template.replace("{{content}}", html_content)
    rendered = rendered.replace("{{title}}", TITLE_ROOT + ' | ' + post['title'])
    rendered = rendered.replace("{{description}}", post['summary'])
    write_html(out_path, rendered)

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
    main()
