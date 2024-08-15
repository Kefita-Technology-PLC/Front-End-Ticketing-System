import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

function usePasswordToggle() {
  const [visible, setVisibility] = useState(false)

  const Icon = <FontAwesomeIcon icon={visible ? faEye : faEyeSlash} onClick={()=> setVisibility(visiblity => !visiblity)} />

  const InputType = visible ? "text" : "password"

  return [InputType, Icon]
}

export default usePasswordToggle
