import { Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowRight, Star, Truck, Shield, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import heroImage from "@/assets/hero-main.jpg";
import menCollection from "@/assets/men-collection.jpg";
import womenCollection from "@/assets/women-collection.jpg";
import kidsCollection from "@/assets/kids-collection.jpg";
import productTshirt from "@/assets/product-tshirt.jpg";
import productJacket from "@/assets/product-jacket.jpg";
import productDress from "@/assets/product-dress.jpg";
import productSneakers from "@/assets/product-sneakers.jpg";

const Home = () => {
  const heroSlides = [
    {
      image: heroImage,
      title: "Discover Your Style",
      subtitle: "Premium fashion for men, women, and kids. Curated collections that blend comfort with contemporary style.",
      cta: "Shop Now",
      ctaLink: "/products"
    },
    {
      image: menCollection,
      title: "Men's Collection",
      subtitle: "Discover the latest trends in men's fashion. From casual to formal, find your perfect look.",
      cta: "Shop Men",
      ctaLink: "/products?category=men"
    },
    {
      image: womenCollection,
      title: "Women's Collection",
      subtitle: "Elegant & contemporary styles for the modern woman. Express your unique personality.",
      cta: "Shop Women",
      ctaLink: "/products?category=women"
    }
  ];

  const categories = [
    {
      title: "Men's Collection",
      subtitle: "Discover the latest trends",
      image: menCollection,
      href: "/men",
      color: "from-blue-600 to-blue-800",
    },
    {
      title: "Women's Collection",
      subtitle: "Elegant & contemporary styles",
      image: womenCollection,
      href: "/women",
      color: "from-pink-600 to-pink-800",
    },
    {
      title: "Kids' Collection",
      subtitle: "Fun & comfortable wear",
      image: kidsCollection,
      href: "/kids",
      color: "from-green-600 to-green-800",
    },
  ];

  const features = [
    {
      icon: <Truck className="h-6 w-6" />,
      title: "Free Shipping",
      description: "Free delivery on orders over $100",
    },
    {
      icon: <RefreshCw className="h-6 w-6" />,
      title: "Easy Returns",
      description: "30-day hassle-free returns",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure Payment",
      description: "Your payment information is protected",
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Quality Guarantee",
      description: "Premium materials and craftsmanship",
    },
  ];

  const trendingProducts = [
    {
      id: 1,
      name: "Classic Cotton T-Shirt",
      price: 29.99,
      originalPrice: 39.99,
      image: productTshirt,
      rating: 4.8,
      reviews: 124,
      badge: "Bestseller",
    },
    {
      id: 2,
      name: "Denim Jacket",
      price: 89.99,
      originalPrice: 109.99,
      image: productJacket,
      rating: 4.6,
      reviews: 89,
      badge: "New",
    },
    {
      id: 3,
      name: "Summer Dress",
      price: 79.99,
      originalPrice: null,
      image: productDress,
      rating: 4.9,
      reviews: 203,
      badge: "Trending",
    },
    {
      id: 4,
      name: "Casual Sneakers",
      price: 119.99,
      originalPrice: 149.99,
      image: productSneakers,
      rating: 4.7,
      reviews: 156,
      badge: "Sale",
    },
  ];

  return (
    <div>
      {/* Hero Carousel */}
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <Carousel 
          className="w-full h-full"
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
        >
          <CarouselContent>
            {heroSlides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[70vh] md:h-[80vh] bg-gradient-to-r from-primary/90 to-primary-hover/90">
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${slide.image})` }}
                  />
                  <div className="absolute inset-0 bg-primary/60" />
                  <div className="relative container mx-auto px-4 h-full flex items-center">
                    <div className="max-w-2xl text-white animate-fade-in">
                      <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        {slide.title}
                      </h1>
                      <p className="text-lg md:text-xl mb-8 opacity-90">
                        {slide.subtitle}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link to={slide.ctaLink}>
                          <Button size="xl" variant="accent" className="w-full sm:w-auto">
                            {slide.cta}
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Button>
                        </Link>
                        <Link to="/products?sale=true">
                          <Button size="xl" variant="secondary" className="w-full sm:w-auto">
                            View Sale
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </section>

      {/* Category Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our carefully curated collections designed for every member of your family
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link key={category.title} to={category.href} className="group">
                <Card className="overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group-hover:scale-105">
                  <div className="relative h-64 md:h-80">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60`} />
                    <div className="absolute inset-0 flex items-end">
                      <div className="p-6 text-white">
                        <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                        <p className="opacity-90 mb-4">{category.subtitle}</p>
                        <Button variant="accent" size="sm">
                          Explore Collection
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trending Now</h2>
            <p className="text-muted-foreground text-lg">
              Most popular items this season
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="group">
                <Card className="overflow-hidden shadow-product hover:shadow-product-hover transition-all duration-300 group-hover:-translate-y-1">
                  <div className="relative">
                    <div className="aspect-square bg-gray-100 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute top-2 left-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        product.badge === 'Sale' ? 'bg-destructive text-destructive-foreground' :
                        product.badge === 'New' ? 'bg-success text-success-foreground' :
                        'bg-accent text-accent-foreground'
                      }`}>
                        {product.badge}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-sm text-muted-foreground ml-1">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products">
              <Button size="lg" variant="outline">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated with Fashion Trends
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Get exclusive access to new collections, special offers, and styling tips delivered to your inbox.
          </p>
          <Link to="/newsletter">
            <Button size="xl" variant="accent">
              Join Our Newsletter
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;