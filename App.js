import React, { useState } from "react";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { ProductAdminProvider } from "./src/context/ProductAdminContext";
import { LoyaltyProvider } from "./src/context/LoyaltyContext";
import { GamificationProvider } from "./src/context/GamificationContext";
import { WishlistProvider } from "./src/context/WishlistContext";
import { CartProvider } from "./src/context/CartContext";
import { MarketplaceProvider } from "./src/context/MarketplaceContext";
import LoginScreen from "./src/screens/LoginScreen";
import AdminScreen from "./src/screens/AdminScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ScheduleScreen from "./src/screens/ScheduleScreen";
import BlogScreen from "./src/screens/BlogScreen";
import CollaborativeWishlist from "./src/components/CollaborativeWishlist";
import ProductScreen from "./src/screens/ProductScreen";
import OrderHistoryScreen from "./src/screens/OrderHistoryScreen";

function MainApp() {
  const { user } = useAuth();
  const [screen, setScreen] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Produtos iniciais de exemplo
  const initialProducts = [
    {
      id: "1",
      name: "Kit Maquiagem Natura",
      price: 129.9,
      image: "https://via.placeholder.com/150x100?text=Natura+Kit",
      brand: "Natura",
      category: "Novidades"
    },
    {
      id: "2",
      name: "Bolsa WJ Casual",
      price: 199.9,
      image: "https://via.placeholder.com/150x100?text=WJ+Bolsa",
      brand: "WJ",
      category: "Bolsas"
    },
    {
      id: "3",
      name: "Perfume Eudora",
      price: 89.9,
      image: "https://via.placeholder.com/150x100?text=Eudora+Perfume",
      brand: "Eudora",
      category: "Perfumaria"
    }
  ];

  if (!user) return <LoginScreen onLogin={() => setScreen("home")} />;

  return (
    <ProductAdminProvider initialProducts={initialProducts}>
      <LoyaltyProvider>
        <GamificationProvider>
          <WishlistProvider>
            <MarketplaceProvider>
              <CartProvider>
                {screen === "home" && (
                  <HomeScreen
                    showAdminButton={user.isAdmin}
                    goToAdmin={() => setScreen("admin")}
                    goToSchedule={() => setScreen("schedule")}
                    goToBlog={() => setScreen("blog")}
                    goToWishlist={() => setScreen("wishlist")}
                    goToProduct={product => {
                      setSelectedProduct(product);
                      setScreen("product");
                    }}
                  />
                )}
                {screen === "admin" && <AdminScreen />}
                {screen === "schedule" && (
                  <ScheduleScreen goBack={() => setScreen("home")} />
                )}
                {screen === "blog" && (
                  <BlogScreen goBack={() => setScreen("home")} />
                )}
                {screen === "wishlist" && (
                  <CollaborativeWishlist />
                )}
                {screen === "product" && selectedProduct && (
                  <ProductScreen
                    product={selectedProduct}
                    goBack={() => setScreen("home")}
                  />
                )}
                {screen === "orders" && (
                  <OrderHistoryScreen />
                )}
              </CartProvider>
            </MarketplaceProvider>
          </WishlistProvider>
        </GamificationProvider>
      </LoyaltyProvider>
    </ProductAdminProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}