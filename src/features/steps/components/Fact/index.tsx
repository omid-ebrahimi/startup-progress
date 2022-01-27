import React, { useEffect, useState } from 'react'
import { fetchFact } from '../../stepsAPI'
import styles from './Fact.module.css'

function Fact() {
  const [fact, setFact] = useState("")
  useEffect(() => {
    fetchFact()
      .then((fact) => setFact(fact))
      .catch(() => setFact("Congratulations!"))
  }, [])

  if (fact === "") return null

  return (
    <div className={styles.container}>
      <p className={styles.text}>
        <strong>
          {fact}
        </strong>
      </p>
    </div>
  )
}

export default Fact
