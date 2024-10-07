import React, {useState, useEffect} from 'react'
import axios from 'axios'
import styles from '../styles/Characters.module.css'
import { FaHeart} from 'react-icons/fa'

export default function Characters(){
//estado para guardar personajes
    const [characters, setCharacters] = useState([])
//estado para carga de datos
    const [loading, setLoading] = useState(true)
//estado para manejo de errores
    const [error, setError] = useState(null)
//estado para favoritos
    const [favorite, setFavorite] = useState([])

    //metodo agregar y eliminar de favoritos
    const toggleFavorite = (character) =>{
        //actualizar estado de favorites

        //comparar personajes
        //find => encontrar en arreglo, devuelve elemento econtrado
        //some => devuelve true si encunetra y false si no
        //array1.find((element) => element >10)

        //validar si el personaje existe o no en el arreglo favorite
        if (favorite.some((element)/*info de cada personaje*/=> element.id == character.id))//saber si dentro de favoritos hay un id
{
    //eliminar personaje d favoritos
    setFavorite(favorite.filter((element) => element.id !== character.id))
}else{
    setFavorite([...favorite/**mantener favoritos de antes */, character])//se hace una copia por el spread operator
}
        
    }

    //useEffect tiene 2 comportamientos: efecto de accion (funcion), arreglo de dependencia (arreglo vacio significa renderizar una vez, nombre d esatdo significa otro efecto) 
    
    useEffect(()=>{
        const getCharacters = async () => {
            try{
                //hacer una promesa para testear loading..., retrasar 2 segundos 
                await new Promise((resolve) => setTimeout(resolve, 2000))

                //obten info de personajes
                const response = await axios.get("https://dragonball-api.com/api/characters")
                //de la data del axios, se solicita arreglo de personajes (items)
                //console.log(response.data.items)
        
                //actualizar estado de personajes
                setCharacters(response.data.items)
        
            }
            catch(error){
                setError(error.message);
                console.log(error.message);
            }
            finally{//finalizar como sea, si se cumplio o no
                setLoading(false) //el loading despues del resultado deja de cargar
            }
        }
        //llama funcion para dar efecto
        getCharacters()
    }, [])//arreglo d dpendencias

//validar carga de datos y manejo de errores
if(loading) return <div>Cargando datos...</div>
if (error) return <div>Hay un error :V {error}</div>

//obtener info api
    return(
        <div className={styles.maincontainer}>
        <div className={styles.container}>
            <h2>Personajes</h2>
            <div className={styles.container_card}>
                {/**Iterar personajes */}
                {
                    characters.map((character) => {
                        const isFavorite = favorite.some((element) => element.id == character.id);

                        return (
                            <div key={character.id} className={styles.card}>
                                <img src={character.image} alt="" />
                                <h3>{character.name}</h3>
                                <p ><strong> {character.ki <=0? <p>No tiene KI</p>: <p>KI: {character.ki}</p>}</strong></p>
                                <p><strong>Raza: {character.race}</strong></p>
                                <button onClick={() => toggleFavorite(character)}><FaHeart className={isFavorite ? styles.active : styles.inactive}/></button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        <div>
            <h2 className={styles.container2}>Favoritos</h2>
            <div>
                {
                    favorite.map((favorite) => {
                        return(
                            <div key={favorite.id} className={styles.card2}>
                                <h3>{favorite.name}</h3>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        </div>
    )
}

