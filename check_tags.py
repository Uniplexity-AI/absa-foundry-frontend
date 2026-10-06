from html.parser import HTMLParser
import sys

class TagBalancer(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
        self.void_elements = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}

    def handle_starttag(self, tag, attrs):
        if tag not in self.void_elements:
            self.stack.append(tag)

    def handle_endtag(self, tag):
        if tag in self.void_elements:
            return
        if not self.stack:
            print(f"Error: Unexpected closing tag </{tag}>")
            sys.exit(1)
        
        last = self.stack.pop()
        if last != tag:
            print(f"Error: Mismatched tag. Expected </{last}> but got </{tag}>")
            sys.exit(1)

with open('src/views/Modules/settings/UserManagement.vue', 'r') as f:
    content = f.read()

template_content = content.split('<template>')[1].split('</template>')[0]
parser = TagBalancer()
parser.feed(template_content)

if parser.stack:
    print(f"Error: Unclosed tags remaining: {parser.stack}")
    sys.exit(1)

print("Template tags are perfectly balanced!")
