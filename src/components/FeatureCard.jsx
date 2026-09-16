import React from 'react'

const FeatureCard = ({title,icon,desc}) => {
  return (
    <div className='feature-card'>
      <div className='feature-img'>
        {icon}
      </div>
      <h3>{title}</h3>
      <p>{desc}</p>
      <span className="feature-link">
        Explore →
      </span>
    </div>
  )
}

export default FeatureCard
