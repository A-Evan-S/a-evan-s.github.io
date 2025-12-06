import os
import shutil
import markdown

SRC_DIR = "site"
PAGES_DIR = os.path.join(SRC_DIR, "pages")
TEMPLATES_DIR = os.path.join(SRC_DIR, "templates")
ASSETS_DIR = os.path.join(SRC_DIR, "assets")
DIST_DIR = "dist"

def clean_dist():
    if os.path.exists(DIST_DIR):
        shutil.rmtree(DIST_DIR)
    os.makedirs(DIST_DIR)

def load_template():
    with open(os.path.join(TEMPLATES_DIR, "main.html"), "r", encoding="utf-8") as f:
        return f.read()

def render_page(md_path, template):
    with open(md_path, "r", encoding="utf-8") as f:
        md_text = f.read()
    html_content = markdown.markdown(md_text)
    return template.replace("{{content}}", html_content)

def build_pages(template):
    for filename in os.listdir(PAGES_DIR):
        if filename.endswith(".md"):
            md_path = os.path.join(PAGES_DIR, filename)
            base = filename[:-3] + ".html"
            out_path = os.path.join(DIST_DIR, base)
            rendered = render_page(md_path, template)
            with open(out_path, "w", encoding="utf-8") as f:
                f.write(rendered)

def copy_assets():
    if os.path.exists(ASSETS_DIR):
        shutil.copytree(ASSETS_DIR, os.path.join(DIST_DIR, "assets"))

def copy_cname():
    if os.path.exists("CNAME"):
        shutil.copy("CNAME", os.path.join(DIST_DIR, "CNAME"))

def main():
    clean_dist()
    template = load_template()
    build_pages(template)
    copy_assets()
    copy_cname()

if __name__ == "__main__":
    main()
