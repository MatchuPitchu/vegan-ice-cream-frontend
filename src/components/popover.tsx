import { IonIcon, IonPopover } from '@ionic/react'
import { informationCircle } from 'ionicons/icons'
import { type PropsWithChildren, useState } from 'react'

import type { PopoverState } from '../types/types'

export const Popover = ({ children }: PropsWithChildren) => {
  const [popoverState, setPopoverState] = useState<PopoverState>({
    showPopover: false,
    event: undefined,
  })

  return (
    <>
      <IonIcon
        className="info-icon"
        slot="end"
        icon={informationCircle}
        onClick={(event) => {
          event.persist()
          setPopoverState({ showPopover: true, event })
        }}
      />
      <IonPopover
        cssClass="info-popover"
        animated={true}
        translucent={true}
        event={popoverState.event}
        isOpen={popoverState.showPopover}
        onDidDismiss={() => setPopoverState({ showPopover: false, event: undefined })}
        backdropDismiss={true}
      >
        {children}
      </IonPopover>
    </>
  )
}
