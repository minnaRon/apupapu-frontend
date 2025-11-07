import Help from './Help'
import { useSelector } from 'react-redux'

const HelpList = ({ filter = null }) => {
  const { helps, loading } = useSelector(state => state.helps)

  if (!helps) return null

  return (
    <div>
      {loading && <p>Loading...</p>}

      <ul>
        {helps
          .filter(filter || (() => true))
          .sort((a, b) => a.task.localeCompare(b.task))
          .map(help =>
            <Help
              key={help.id}
              help={help}
            />
          )}
      </ul>
    </div>
  )
}

export default HelpList
