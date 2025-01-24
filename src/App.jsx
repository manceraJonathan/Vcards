import { useState } from 'react'
import './App.css'
import FormField from './components/FormField'
import QRCode from 'react-qr-code'

function App() {
  const [cardData, setCardData] = useState({
    name: '',
    cellphone: '',
    email: '',
    company: '',
    rol: ''
  })

  const [qrValue, setQrValue] = useState(null)

  const handleInputChange = e => {
    const { name, value } = e.target
    setCardData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    const data = generateVCard()
    console.log('Generated vCard:', data)
    setQrValue(data)
  }

  const generateVCard = () => {
    return `
BEGIN:VCARD
VERSION:4.0
FN:${cardData.name || 'N/A'}
ORG:${cardData.company || 'N/A'}
TITLE:${cardData.position || 'N/A'}
TEL;TYPE=work,voice:+57${cardData.phone || 'N/A'}
EMAIL;TYPE=internet:${cardData.email || 'N/A'}
END:VCARD
    `.trim()
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="grid grid-cols-2 w-full h-1/2 gap-4 mx-8">
        <section className="bg-slate-800 rounded-md p-4">
          <form className="text-slate-300" onSubmit={handleSubmit}>
            <FormField>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleInputChange}
              />
            </FormField>
            <FormField>
              <label htmlFor="cellphone">Cellphone</label>
              <input
                type="tel"
                name="cellphone"
                id="cellphone"
                onChange={handleInputChange}
              />
            </FormField>
            <FormField>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleInputChange}
              />
            </FormField>
            <FormField>
              <label htmlFor="company">Company</label>
              <input
                type="text"
                name="company"
                id="company"
                onChange={handleInputChange}
              />
            </FormField>
            <FormField>
              <label htmlFor="rol">Role</label>
              <input
                type="text"
                name="rol"
                id="rol"
                onChange={handleInputChange}
              />
            </FormField>
            <button
              type="submit"
              className="bg-emerald-400 rounded-md p-2 text-slate-200"
            >
              Generar QR
            </button>
          </form>
        </section>
        <section className="bg-slate-700 rounded-md">
          {qrValue ? (
            <QRCode value={qrValue} />
          ) : (
            <p className="text-slate-300 p-4">No QR code to display</p>
          )}
        </section>
      </div>
    </div>
  )
}

export default App
