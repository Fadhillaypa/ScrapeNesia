import sys
import time
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup

# Mendapatkan URL dari argumen
base_url = sys.argv[1]
max_pages = 3  # Jumlah halaman yang ingin diambil

# Setup Selenium WebDriver
options = webdriver.ChromeOptions()
options.add_argument("--headless")
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64)")

driver = webdriver.Chrome(options=options)
data = []

for page in range(1, max_pages + 1):
    url = base_url + f"&page={page}"
    driver.get(url)

    # Tunggu elemen utama agar halaman sepenuhnya dimuat
    try:
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "div.css-5wh65g"))  # Pastikan elemen produk ditemukan
        )
    except Exception as e:
        print(f"Gagal menemukan elemen utama: {e}")
        continue

    # Scroll ke bawah agar semua produk dimuat
    for _ in range(5):
        driver.execute_script("window.scrollBy(0, document.body.scrollHeight)")
        time.sleep(2)  # Delay untuk memastikan loading selesai

    time.sleep(3)  # Tambahan delay agar semua elemen termuat

    soup = BeautifulSoup(driver.page_source, "html.parser")
    produk_list = soup.find_all("div", class_="css-5wh65g")  # Selector utama produk

    for item in produk_list:
        try:
            # Ambil data produk dengan selector yang lebih fleksibel
            nama_produk = item.find("div", class_="_6+OpBPVGAgqnmycna+bWIw==")  # Nama produk
            harga = item.find("div", class_="XvaCkHiisn2EZFq0THwVug==")  # Harga
            rating = item.find("span", class_="_9jWGz3C-GX7Myq-32zWG9w==")  # Rating
            terjual = item.find("span", class_="se8WAnkjbVXZNA8mT+Veuw==")  # Terjual
            lokasi = item.find("span", class_="pC8DMVkBZGW7-egObcWMFQ== flip")  # Lokasi
            link_produk = item.find("a", href=True)  # URL Produk


            # Simpan data dalam format JSON
            data.append({
                "produkUrl": f"{link_produk['href']}" if link_produk else "Tidak Ada URL",
                "produkName": nama_produk.text if nama_produk else "Tidak Diketahui",
                "produkPrice": harga.text if harga else "Tidak Diketahui",
                "produkRating": rating.text if rating else "Tidak Ada Rating",
                "produkTerjual": terjual.text if terjual else "Belum Terjual",
                "produkLokasi": lokasi.text if lokasi else "Tidak Diketahui"
            })
        except Exception as e:
            print(f"Kesalahan saat mengambil data produk: {e}")

driver.quit()

# Cetak JSON agar bisa dikembalikan ke Flask
print(json.dumps(data))
