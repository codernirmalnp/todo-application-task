import axios from 'axios'
import Head from 'next/head'
import React from 'react'
import Link from 'next/link'


export default function Home(props: any) {
  const { api } = props
  return (
    <div className="home"><h1> {api.welcome}</h1><Link href="/todo" className='add-button'>Go To Todo</Link></div>
  )
}

export async function getServerSideProps() {
  const api = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}`).then(({ data }) => {

    return data
  });


  return { props: { api } }

}
