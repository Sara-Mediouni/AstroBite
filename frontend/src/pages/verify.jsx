
import {useNavigate, useSearchParams} from 'react-router-dom'

export default function VerifyOrder() {
     const navigate=useNavigate();
     const [searchParams] = useSearchParams();

 
     const success = searchParams.get("success");
     const orderId = searchParams.get("orderId");
     if (success === 'true') {
       localStorage.removeItem('cart'); // ou localStorage.clear();
     }

    const handlenavigate=()=>{
        navigate('/')
    }
    return (
      <section className="min-h-screen flex flex-col justify-center items-center  text-white px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-300 tracking-wider mb-4">
          🛸 Confirming Your Order...
        </h1>
        <p className="text-white/80 text-lg max-w-md mb-10">
          Please hold tight as we beam your delicious meal through the galaxy. Your order is being processed and will arrive shortly!
        </p>
        <div className="w-24 h-24 border-4 border-yellow-300 border-t-transparent rounded-full animate-spin mb-8" />
  
        <button onClick={handlenavigate}
        className="px-6 py-3 bg-yellow-300 text-black font-bold rounded-full shadow hover:scale-105 transition-transform">
          Back to Home
        </button>
      </section>
    );
  }
  