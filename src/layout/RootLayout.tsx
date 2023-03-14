import React from 'react'

type LayoutProps = {
  children: React.ReactNode
}

const RootLayout = ({children}:LayoutProps) => {
  return (
    <div className="flex flex-col items-center justify-between">
      {children}
    </div>
  )
}

export default RootLayout