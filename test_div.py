from html.parser import HTMLParser

class TagBalancer(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
        self.void_elements = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}

    def handle_starttag(self, tag, attrs):
        if tag not in self.void_elements:
            self.stack.append((tag, self.getpos()[0]))

    def handle_endtag(self, tag):
        if tag in self.void_elements:
            return
        last_tag, pos = self.stack.pop()
        if last_tag != tag:
            print(f"Error: Mismatched tag at line {self.getpos()[0]}. Expected </{last_tag}> (opened at line {pos}) but got </{tag}>")
            import sys; sys.exit(1)

with open('src/views/Modules/settings/UserManagement.vue', 'r') as f:
    lines = f.read().split('<template>')[1].split('</template>')[0].split('\n')

content = '\n'.join(lines)
parser = TagBalancer()
parser.feed(content)
if parser.stack:
    for tag, pos in parser.stack:
        print(f"Unclosed <{tag}> opened at line {pos}")
        print("Line content:", lines[pos-1])
else:
    print("THE FILE IS NOW PERFECTLY BALANCED!")
