import { currentUser } from '@clerk/nextjs/server'

export default async function Page() {
  const user = await currentUser()
  return <div className='flex h-full flex-col  text-center mx-5 justify-center items-center'>
    <h1 className="text-xl md:text-2xl tracking-tight text-gray-900 dark:text-white mb-5">
      Bem-vindo <span className='font-extrabold'>{user?.firstName}</span>
    </h1>
    <h1 className="text-lg md:text-xl tracking-tight text-gray-900 dark:text-white">
      Está é uma área onde você poderá configurar seu Cardap.io
    </h1>
    <h1 className="text-lg md:text-xl tracking-tight text-gray-900 dark:text-white">Cadastre seus produtos, confira seus pedidos e caso tiver alguma dúvida</h1>
    <h1 className="text-lg md:text-xl tracking-tight text-gray-900 dark:text-white">sinta-se a vontade de nos chamar no <a
      href="https://wa.me/5519985444889"
      target="_blank"
      rel="noopener noreferrer"
      className="text-green-600 hover:underline"
    >Whatsapp</a>
    </h1>
  </div>
}
