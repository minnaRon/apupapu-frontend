const HelpForm = ({
  addHelp,
  tittle,
  description,
  beans,
  handleTittleChange,
  handleDescriptionChange,
  handleBeansChange
}) => { 
  return (
    <>
      <form style={{color: 'green'}} onSubmit={addHelp}>
        apuna:
        <input style={{color: 'grey'}}
          value={tittle}
           onChange={handleTittleChange} />
        <br />
        papua:
        <input
          style={{ width:'40px', color: 'grey' }}
          type='number'
          value={beans}
          onChange={handleBeansChange}
          min='0'
        />
        <br />
        tarkempi kuvaus:
        <br />
        <textarea
          style={{color: 'grey'}}
          rows = "5"
          value={description}
           onChange={handleDescriptionChange} /> 
        <br />
        <button type="submit">TALLENNA</button>
      </form>
    </>
  )
}

export default HelpForm
