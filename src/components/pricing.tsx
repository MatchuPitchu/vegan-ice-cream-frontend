type PricingProps = {
  pricing: number[]
  className?: string
}

export const Pricing = ({ pricing, className }: PricingProps) => {
  return (
    <div className={`pricing-indication ${className}`}>
      <div>Eiskugel</div>
      <div className="pricing-indication__number">
        {pricing[pricing.length - 1]
          .toLocaleString('de-DE', {
            style: 'currency',
            currency: 'EUR',
            currencyDisplay: 'symbol',
          })
          .split(',')}
      </div>
    </div>
  )
}
