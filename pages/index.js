import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState, useRef } from 'react';

export default function Home() {

  const draggingItem = useRef();
  const dragOverItem = useRef();

  const [list, setList] = useState([
    'Coxinha',
    'Brigadeiro',
    'Pão de queijo',
    'Farofa',
    'Açaí ',
    'Feijoada'
  ]);


  const [destinationList, setDestinationList] = useState([]);

  const handleDragStart = (e, position) => {
    draggingItem.current = position;
  };

  const handleDragEnter = (e, position) => {
    dragOverItem.current = position;
    //console.log('Passando por cima de:', e.target.innerHTML);
  };

  const handleDragOver = (e) => {
    e.dataTransfer.dropEffect = "move";
    e.preventDefault();
  };

  const handleDrop = (e) => {
    const position = draggingItem.current
    removeFromList(position)
  }

  const removeFromList = (position) => {
    const aux = list.filter((item, index) => {
      return index != position
    })

    addToDestinationList(list[position])

    setList([...aux])
  }

  const addToDestinationList = (item) => {
    if (!item) return;
    
    const aux = destinationList
    aux.push(item)
    setDestinationList([...aux])
  }




  return (

    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>


        {
          list &&
          list.map((item, index) => (
            <h1 key={index} draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDragOver={handleDragOver}
            >
              {item}
            </h1>
          ))}


        <div className={styles.dragbox} onDrop={handleDrop} onDragEnter={(e) => console.log('Entrou no drag over')} onDragOver={handleDragOver}>
          <h2>
            Drag here
            </h2>
          {

            destinationList &&
            destinationList.map((item, index) => (
              <h1 key={index}  >
                {item}
              </h1>
            ))}
        </div>


      </main>

      <footer className={styles.footer}>
        <h6>Feito com 💚 por <a href="https://github.com/theusf">Matheus Francisco</a></h6>
      </footer>
    </div>
  )
}
