import { IonLoading, IonToast } from '@ionic/react'

import { useAppSelector } from '../store/hooks'

// TODO: LoadingError create as Overlay with React Portal
export const LoadingError = () => {
  const { isLoading, error } = useAppSelector((state) => state.app)

  return (
    <>
      <IonLoading isOpen={isLoading} message={'Einen Moment bitte ...'} />
      <IonToast
        cssClass="toast--error"
        isOpen={!!error} // convert error string to boolean
        message={error}
      />
    </>
  )
}
