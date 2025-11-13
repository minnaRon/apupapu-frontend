const UserSettingsForm = () => {

  const settings = [
    'etunimi', 'sukunimi', 'sähköposti', 'puhelinnumero', 'osoite',
    'salasanan muutos', 'apuaikataulutus', 'apualue', 'ryhmät', 'henkilöiden rajaus',
    'omat viisi tuttua, joille liittymislinkin lähetys sähköpostiin', 'papumäärä',
    'omien aputapahtumien lista jossa arviotähdet ja linkit tarkemmin tapahtumien tietoihin']

  return (
    <>
      <h2>Käyttäjän asetukset tänne</h2>
      <ul>
        {settings.map((setting, index) =>
          <li key={index}>{setting}</li>
        )}
      </ul>
    </>
  )
}

export default UserSettingsForm
