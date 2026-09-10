"""Fetch CC BY 4.0 anatomical meshes; see public/ATTRIBUTION.md."""
import concurrent.futures, json, pathlib, urllib.request
root=pathlib.Path(__file__).resolve().parent.parent
base='https://raw.githubusercontent.com/slorksmo/Human-Atlas/main/public'
chunks=[]
for name in ['atlas.json','atlas-female.json']:
    data=json.loads((root/'public/models'/name).read_text())
    chunks.extend(c['gzip'] for c in data['chunks'])
def fetch(path):
    dest=root/'public'/path.lstrip('/')
    if dest.exists() and dest.stat().st_size>1000:return
    urllib.request.urlretrieve(base+path,dest)
    print(dest.name,flush=True)
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:list(pool.map(fetch,chunks))
print('Anatomical assets downloaded.')
