
import { Link } from 'react-router-dom'; // Import Link for navigation
import Text from '/assets/img/Text Container.png';
import Choclate from '/assets/img/right_choclate.png';
import Choclate1 from '/assets/img/choclate1.png';
import Choclate2 from '/assets/img/choclate2.png';
import Choclate3 from '/assets/img/choclate3.png';
import Choclate4 from '/assets/img/choclate4.png';
import Choclate5 from '/assets/img/choclate5.png';
import groupLine from '/assets/img/groupLine.png';
import Roundedbg from '/assets/img/Roundedbg.png'; 
import textImg from '/assets/img/text.png'; 
import bsqImg from '/assets/img/bsq.png'; 
import rbgImg from '/assets/img/rbg.png'; 
import { IoIosArrowForward } from "react-icons/io";

const Landing = () => {
  return (
    <div className='landing w-full h-fit bg-white px-4 py-3 mt-14'>
        <div className="landing-image overflow-hidden w-full h-screen bg-[#592D1E] rounded-2xl px-8 py-6 flex justify-between relative">
            <div className="landing-text relative">
                <img className='text-content w-[42vw]' src={Text} alt="" />
                <img className='images absolute top-12 -right-12 scale-[0.6]' src={Choclate1} alt="" />
                <img className='images absolute -top-4 -left-8 scale-[0.6]' src={Choclate2} alt="" />
                <img className='images absolute -bottom-10 -right-28 scale-[0.5]' src={Choclate3} alt="" />
                <img className='images absolute bottom-24 -left-14 scale-[0.4] z-10' src={Choclate4} alt="" />
                <div className="images shop-now flex items-center mt-7">
                <div className="circles flex relative">
  <div className="circle w-[4.4vw] h-[4.4vw] rounded-full bg-[#833829] border border-black" 
       style={{ backgroundImage: `url('/assets/img/c3.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
  </div>
  <div className="circle w-[4.4vw] h-[4.4vw] rounded-full bg-[#833829] relative -left-8 border border-black" 
       style={{ backgroundImage: `url('/assets/img/c2.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
  </div>
  <div className="circle w-[4.4vw] h-[4.4vw] rounded-full bg-[#833829] relative -left-16 border border-black" 
       style={{ backgroundImage: `url('/assets/img/c1.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
  </div>
</div>

                    <div className='flex gap-16 items-center'>
                       <div className='text-white'>
                        <h1 className='text-5xl font-bold'>520 +</h1>
                        <p className='text-[grey] font-sans'>Happy Customers</p>
                       </div>
                       <div className='hrline w-[1px] h-16 bg-white'></div>
                       <div className='text-white'>
                        <h1 className='text-5xl font-bold'>780 +</h1>
                        <p className='text-[grey] font-sans'>Recipes</p>
                       </div>
                    </div>
                </div>
                <div className='images buttons mt-12 flex gap-5'>
                    {/* Link to Product Page */}
                    <Link to="/shop">
                        <button className='bg-[#833829] text-white font-semibold font-sans py-5 px-10 rounded-full text-lg'>
                            Grab a Bite
                        </button>
                    </Link>
                    <button className='flex items-center gap-3 text-white font-bold py-4 px-7 rounded-full text-lg'>
                        <IoIosArrowForward/> 
                    </button>
                </div>
            </div>
            <img className='absolute top-[-150px] right-[-130px] scale-[0.8]' src={Choclate} alt="" /> 
            <img className='absolute top-0 right-0 scale-[0.8] z-10' src={Choclate5} alt="" />
            <img className='absolute -top-64 -right-28 scale-[0.6] z-10' src={groupLine} alt="" />

            {/* Adjusted Roundedbg and content on top */}
            <div className='rounded-section absolute bottom-[0px] right-[-1px] scale-[0.7] z-0'>
    <img src={Roundedbg} alt="Rounded background" className='relative z-0' />

    {/* Divs placed in horizontal manner on top of Roundedbg */}
    <div className='absolute top-0 left-0 w-full h-full flex justify-between items-center'>
        {/* First div with text.png */}
        <div className='w-1/4 h-full flex justify-center items-center'>
            <img className='absolute right-[470px]' src={textImg} alt="Text" />
        </div>

        {/* Add vertical gray line between first and second div */}
        <div className='w-[2px] h-[70%] bg-gray-400 mx-4'></div>

       
        <div className='w-1/4 h-full flex justify-center items-center relative'>
            <img className='absolute top-[30px]' src={bsqImg} alt="BSQ" />
            <img className='absolute top-[30px] left-0 right-0 m-auto w-[80px] h-[80px] object-cover' src="/assets/img/s1.jpg" alt="s1" />
            <div className="absolute top-[110px] text-black text-center">
                <h2 className="font-bold text-lg font-sans">Chocolates</h2>
                <Link to="/shop" className=" text-gray-600 font-sans">Buy now &gt;</Link>
            </div>
        </div>

        
        <div className='w-1/4 h-full flex justify-center items-center relative'>
            <img className='absolute md:top-[-31px]' src={rbgImg} alt="RBG" />
            <img className='absolute -top-10 md:top-[0px]' src={bsqImg} alt="BSQ over RBG" />
            <img className='absolute md:top-[0px] left-0 right-0 m-auto w-[80px] h-[80px] object-cover' src="/assets/img/s2.jpg" alt="s2" />
            <div className="absolute top-[80px] text-white text-center">
                <h2 className="font-bold text-lg font-sans">Bon Bon</h2>
                <Link to="/shop" className=" text-white font-sans">Buy now &gt;</Link>
            </div>
        </div>

       
        <div className='w-1/4 h-full flex justify-center items-center relative'>
            <img className='absolute top-[30px]' src={bsqImg} alt="BSQ" />
            <img className='absolute top-[30px] left-0 right-0 m-auto w-[80px] h-[80px] object-cover' src="/assets/img/s3.jpg" alt="s3" />
            <div className="absolute top-[110px] text-black text-center">
                <h2 className="font-bold text-lg font-sans">Cookie</h2>
                <Link to="/shop" className=" text-gray-600 font-sans">Buy now &gt;</Link>
            </div>
        </div>
    </div>
</div>

        </div>
    </div>
  )
}

export default Landing;
