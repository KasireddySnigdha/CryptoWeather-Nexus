# CryptoWeather-Nexus

CryptoWeather Nexus is a modern multi-page dashboard that provides real-time weather data, cryptocurrency information, and news updates. The project integrates WebSocket notifications for real-time updates and is built using Next.js, React, Redux, and Tailwind CSS.

###  **Deployed Link: https://cryptonexus-8qfjby8e9-snigdhas-projects-e96b32fb.vercel.app/ 🚀** 

### **1. Clone the Repository**  
```bash
git clone https://github.com/KasireddySnigdha/CryptoWeather-Nexus.git
cd CryptoWeather-Nexus
```

### **2. Install Dependencies**  
```bash
npm install
```

### **3. Set Up Environment Variables**  
- Create a `.env.local` file in the project root.  
- Add the required API keys:  
  ```
  NEXT_PUBLIC_WEATHER_API_KEY=your_openweathermap_api_key
  NEXT_PUBLIC_CRYPTO_API_KEY=your_coingecko_api_key
  NEXT_PUBLIC_NEWS_API_KEY=your_newsdata_api_key
  ```

### **4. Start the Development Server**  
```bash
npm run dev
```
- Open [http://localhost:3000](http://localhost:3000) in your browser.

### **5. Build and Run for Production**  
```bash
npm run build
npm start
```

### **6. Deploy to Vercel (Optional)**  
```bash
vercel
```
