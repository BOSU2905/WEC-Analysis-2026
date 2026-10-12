import os
import gzip

dist_dir = "/home/ben/WEC-Analysis-2026/web/dist"

categories = {
    "JavaScript": [".js", ".mjs"],
    "CSS": [".css"],
    "Fonts": [".woff", ".woff2", ".ttf", ".otf"],
    "Images (Raster)": [".webp", ".jpg", ".jpeg", ".png"],
    "Images (Vector)": [".svg"],
    "3D Models": [".glb", ".gltf"],
    "HTML": [".html"],
    "Data/Other": [".json", ".csv", ".txt", ".nojekyll"]
}

file_stats = []

for root, _, files in os.walk(dist_dir):
    for f in files:
        filepath = os.path.join(root, f)
        relpath = os.path.relpath(filepath, dist_dir)
        size = os.path.getsize(filepath)
        
        with open(filepath, 'rb') as fp:
            data = fp.read()
            gz_size = len(gzip.compress(data))
        
        ext = os.path.splitext(f)[1].lower()
        cat = "Data/Other"
        for c, exts in categories.items():
            if ext in exts:
                cat = c
                break
                
        file_stats.append({
            "relpath": relpath,
            "category": cat,
            "ext": ext,
            "size": size,
            "gz_size": gz_size
        })

file_stats.sort(key=lambda x: x["size"], reverse=True)

print("=" * 80)
print("PRODUCTION DIST SUMMARY BY CATEGORY")
print("=" * 80)
category_totals = {}
for item in file_stats:
    c = item["category"]
    if c not in category_totals:
        category_totals[c] = {"count": 0, "size": 0, "gz_size": 0}
    category_totals[c]["count"] += 1
    category_totals[c]["size"] += item["size"]
    category_totals[c]["gz_size"] += item["gz_size"]

for c, totals in sorted(category_totals.items(), key=lambda x: x[1]["size"], reverse=True):
    print(f"{c:<18}: {totals['count']:>3} files | {totals['size'] / 1024:>10.2f} KB ({totals['size'] / (1024*1024):>6.2f} MB) | Gzip: {totals['gz_size'] / 1024:>8.2f} KB")

total_size = sum(x["size"] for x in file_stats)
total_gz = sum(x["gz_size"] for x in file_stats)
print("-" * 80)
print(f"{'TOTAL':<18}: {len(file_stats):>3} files | {total_size / 1024:>10.2f} KB ({total_size / (1024*1024):>6.2f} MB) | Gzip: {total_gz / 1024:>8.2f} KB")
print("=" * 80)

print("\nTOP 25 LARGEST ASSETS:")
print(f"{'Path':<55} | {'Category':<15} | {'Size (KB)':<10} | {'Gzip (KB)':<10}")
print("-" * 95)
for item in file_stats[:25]:
    print(f"{item['relpath']:<55} | {item['category']:<15} | {item['size']/1024:>9.2f} KB | {item['gz_size']/1024:>9.2f} KB")
