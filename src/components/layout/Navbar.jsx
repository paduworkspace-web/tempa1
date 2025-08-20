@@ .. @@
-// Navbar.jsx
-import React, { useRef, useState, useEffect } from "react";
-import { TiLocationArrow } from "react-icons/ti";
-import Button from "./Button"; // Assuming this is used elsewhere or will be removed if not needed
-import { CgMenu } from "react-icons/cg"; // Not used in Navbar, can be removed
+import React, { useRef, useState } from "react";
+import { Link, useNavigate } from "react-router-dom";
+import { useAuth } from "../../context/AuthContext";
+import { User, LogOut } from "lucide-react";
 
-const Navbar = ({ onOpenLogin, onOpenRegister }) => {
+const Navbar = ({ onOpenLogin, onOpenRegister }) => {
   const navContainerRef = useRef(null);
+  const { user, logout, isAuthenticated } = useAuth();
+  const navigate = useNavigate();
+  const [showUserMenu, setShowUserMenu] = useState(false);
 
-  const handleProductClick = () => {
-    console.log("Product button clicked!");
+  const handleLogout = () => {
+    logout();
+    navigate('/');
   };
 
   return (
@@ .. @@
         <nav className="flex size-full items-center justify-between px-4 py-2 bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 shadow-lg shadow-black/10 mix-blend-difference">
           <div className="flex items-center gap-7 w-full relative">
             {/* Logos - Fixed positioning */}
             <div className="flex-shrink-0 flex items-center gap-3">
-              <img
-                className="h-10 w-10 bordr" // Typo: 'bordr' should probably be 'border'
-                src="/img/logo.png"
-                alt="mantra logo logo"
-              />
+              <Link to="/" className="flex items-center gap-3">
+                <img
+                  className="h-10 w-10 rounded-full"
+                  src="/img/logo.png"
+                  alt="Mantra logo"
+                />
+              </Link>
             </div>
 
-            {/* Left Navigation Buttons - ONLY VISIBLE ON MD AND UP */}
-            {/* Original comment for CgMenu button was here, it's moved to MiniNavbar */}
-            <div className="absolute right-20 mr-5 flex-shrink-0 animate-shimmer hidden lg:flex">
-              {" "}
-              {/* Added hidden md:flex */}
-              <LiquidGlassButton
-                id="Register"
-                title="Register"
-                onClick={onOpenRegister}
-              />
-            </div>
+            {/* Navigation Links - ONLY VISIBLE ON LG AND UP */}
+            {isAuthenticated && (
+              <div className="hidden lg:flex items-center space-x-6 ml-8">
+                <Link to="/dashboard" className="text-white hover:text-purple-300 transition-colors">
+                  Dashboard
+                </Link>
+                <Link to="/meditations" className="text-white hover:text-purple-300 transition-colors">
+                  Meditations
+                </Link>
+                <Link to="/therapists" className="text-white hover:text-purple-300 transition-colors">
+                  Therapy
+                </Link>
+                <Link to="/forum" className="text-white hover:text-purple-300 transition-colors">
+                  Community
+                </Link>
+              </div>
+            )}
 
             {/* Spacer to push Play button to the right */}
             <div className="flex-grow"></div>
 
-            {/* Right Play Button - ONLY VISIBLE ON MD AND UP */}
-            <div className="flex-shrink-0 text-white animate-shimmer hidden lg:flex">
-              {" "}
-              {/* Added hidden md:flex */}
-              <LiquidGlassButton
-                id="Log-In"
-                title="LogIn"
-                variant="primary"
-                onClick={onOpenLogin}
-              />
-            </div>
+            {/* Auth Buttons or User Menu - ONLY VISIBLE ON LG AND UP */}
+            {isAuthenticated ? (
+              <div className="relative hidden lg:block">
+                <button
+                  onClick={() => setShowUserMenu(!showUserMenu)}
+                  className="flex items-center space-x-2 text-white hover:text-purple-300 transition-colors"
+                >
+                  <User className="h-5 w-5" />
+                  <span>{user?.name}</span>
+                </button>
+                
+                {showUserMenu && (
+                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
+                    <Link
+                      to="/profile"
+                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
+                      onClick={() => setShowUserMenu(false)}
+                    >
+                      Profile
+                    </Link>
+                    <button
+                      onClick={handleLogout}
+                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
+                    >
+                      <LogOut className="h-4 w-4 inline mr-2" />
+                      Logout
+                    </button>
+                  </div>
+                )}
+              </div>
+            ) : (
+              <div className="flex-shrink-0 text-white animate-shimmer hidden lg:flex space-x-4">
+                <LiquidGlassButton
+                  id="Register"
+                  title="Register"
+                  onClick={onOpenRegister}
+                />
+                <LiquidGlassButton
+                  id="Log-In"
+                  title="LogIn"
+                  variant="primary"
+                  onClick={onOpenLogin}
+                />
+              </div>
+            )}
           </div>
         </nav>
       </header>
@@ .. @@
 };
 
 export default Navbar;