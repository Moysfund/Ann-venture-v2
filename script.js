// ✅ Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8hFcULiR_DtQbHvSswwgUsvCuM0w7z50",
  authDomain: "anns-venture.firebaseapp.com",
  projectId: "anns-venture",
  storageBucket: "anns-venture.appspot.com", // corrected
  messagingSenderId: "699590854312",
  appId: "1:699590854312:web:4a88d59ef45563bbf1649d",
  measurementId: "G-X2RCRHZVJ0"
};

// ✅ Initialize Firebase
firebase.initializeApp(firebaseConfig);

// ✅ Reference to products in Realtime Database
const productsRef = firebase.database().ref("products");

// ✅ Render products into Drinks & Clothing sections
function renderProducts(snapshot) {
  const drinksGrid = document.getElementById("drinks-grid");
  const clothingGrid = document.getElementById("clothing-grid");

  drinksGrid.innerHTML = "";
  clothingGrid.innerHTML = "";

  const products = snapshot.val();
  for (let id in products) {
    const p = products[id];
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <h3>${p.name}</h3>
      <p>₦${p.price}</p>
      <button class="btn btn-primary">Add to cart</button>
    `;
    if (p.category === "drink") {
      drinksGrid.appendChild(card);
    } else if (p.category === "clothing") {
      clothingGrid.appendChild(card);
    }
  }
}

// ✅ Listen for changes in Firebase
productsRef.on("value", renderProducts);

// ✅ Run once when page loads
document.addEventListener("DOMContentLoaded", () => {
  productsRef.once("value", renderProducts);
});
