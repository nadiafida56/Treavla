import requests, os, zipfile

API_KEY = '846952'
query = 'nature'
count = 50
folder = 'nature_images'

os.makedirs(folder, exist_ok=True)

for i in range(count):
    url = f'https://api.unsplash.com/photos/random?query={query}&client_id={API_KEY}'
    response = requests.get(url).json()
    img_url = response['urls']['full']
    img_data = requests.get(img_url).content
    with open(f'{folder}/{i+1}.jpg', 'wb') as f:
        f.write(img_data)

# Zip the folder
with zipfile.ZipFile('nature_images.zip', 'w') as zipf:
    for file in os.listdir(folder):
        zipf.write(os.path.join(folder, file))
