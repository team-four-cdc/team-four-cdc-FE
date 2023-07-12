import React from 'react'
import ChangePassword from './change-password'

export default async function Page({ params: { token } }: { params: { token: string } }) {
  return <ChangePassword token={token} />
}

