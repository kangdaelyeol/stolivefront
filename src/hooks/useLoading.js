import { useState } from 'react'
import LoadingSpinner from './LoadingSpinner'

const useLoading = (Component, size, message) => {
    const DefaultComp = () => Component
    const [isLoading, setIsLoading] = useState(false)
    const ToggleComponent = () => (
        <>
            {isLoading ? (
                <LoadingSpinner size={size} message={message} />
            ) : (
                <DefaultComp />
            )}
        </>
    )
    return [setIsLoading, ToggleComponent]
}

export default useLoading
