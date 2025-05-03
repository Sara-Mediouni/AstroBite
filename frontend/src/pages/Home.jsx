import React from 'react'
import Hero from '../HomeSections/Hero'
import SpecialOfferSection from '../HomeSections/MenuSection'
import FeaturedSection from '../HomeSections/FeaturedSection'
import DeliveryCTA from '../HomeSections/CTA'
import CustomizeMeal from '../HomeSections/CustomizeMeal'
import CockpitOrder from '../HomeSections/OrderSections'
import WhyChooseUs from '../HomeSections/WhyUs'
import Testimonials from '../HomeSections/Testimonials'
import Pizza from '../HomeSections/Pizza'
import Pastry from '../HomeSections/Pastry'

const Home = () => {
  return (
    <div>
        <Hero/> <CockpitOrder/>
        

        <WhyChooseUs/>
        <FeaturedSection/>
     
        <CustomizeMeal/>
        <Pizza/>
        <Pastry/>
        <Testimonials/>
          <SpecialOfferSection/>
          
        <DeliveryCTA/>
        
    </div>
  )
}

export default Home