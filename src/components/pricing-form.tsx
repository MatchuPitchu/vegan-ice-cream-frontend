import { IonButton, IonIcon, IonLabel } from '@ionic/react'
import { checkmarkCircleOutline } from 'ionicons/icons'
import { useState } from 'react'
// Context
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'

import { useUpdatePricingMutation } from '../store/api/locations-api-slice'
import { appActions } from '../store/app-slice'
// Redux Store
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { getSelectedLocation } from '../store/locations-slice'
import { PricingRange } from './form-fields/pricing-range'

type PricingFormValues = {
  pricing: number
}

type PricingFormProps = {
  onFinishUpdatePricing: () => void
}

export const PricingForm = ({ onFinishUpdatePricing }: PricingFormProps) => {
  const dispatch = useAppDispatch()
  const { isAuth, user } = useAppSelector((state) => state.user)
  const selectedLocation = useAppSelector(getSelectedLocation)

  const [isFormVisible, setIsFormVisible] = useState(true)

  const [triggerUpdatePricing, result] = useUpdatePricingMutation()

  const { control, handleSubmit } = useForm<PricingFormValues>({
    defaultValues: { pricing: 0 },
  })

  const onSubmit: SubmitHandler<PricingFormValues> = async ({ pricing }) => {
    if (!pricing) return

    dispatch(appActions.setIsLoading(true))
    if (pricing > 0) {
      await triggerUpdatePricing({ location_id: selectedLocation!._id, pricing })
    }
    setIsFormVisible(false)
    setTimeout(() => {
      setIsFormVisible(true)
      onFinishUpdatePricing()
    }, 3000)
    dispatch(appActions.setIsLoading(false))
  }

  if (!isAuth && !user) return <IonLabel color="medium">Anmeldung notwendig</IonLabel>

  if (!isFormVisible) return <IonLabel color="medium">Danke für deine Eingabe</IonLabel>

  return (
    <form className="pricing-form" onSubmit={handleSubmit(onSubmit)}>
      <PricingRange
        name="pricing"
        control={control}
        rules={{ min: { value: 0.1, message: 'Wähle einen Preis aus' } }}
        className="pricing-form__item"
      />
      <IonButton fill="clear" type="submit" strong={true} className="pricing-form__button--check">
        <IonIcon slot="end" icon={checkmarkCircleOutline} />
        Senden
      </IonButton>
    </form>
  )
}
