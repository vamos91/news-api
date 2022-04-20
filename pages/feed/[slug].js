import styles from '../../styles/Feed.module.css'
import { useRouter } from 'next/router'
import { Toolbar } from '../../components/Toolbar'

export const Feed = ({pageNumber, articles}) => {
    const router = useRouter()
    console.log(articles)
    return(
        <div className='page-container'>
            <Toolbar />
            <div className={styles.main}>
                <ul>
                    {
                        articles.map((article, index) => (
                            <li key={index} className={styles.post} onClick={() => window.location.href = article.url}>
                                <h1>{article.title}</h1>
                                <p>{article.description}</p>
                                {!!article.urlToImage && <img src={article.urlToImage} />}
                            </li>
                        ))

                    }
                </ul>
            </div>
            <div className={styles.paginator}>
                <div className={pageNumber === 1 ? styles.disabled : styles.active} onClick={() => router.push('/feed/' + (pageNumber - 1))}>PREV</div>
                <div className={styles.page}>{pageNumber}</div>
                <div className={pageNumber === 5 ? styles.disabled : styles.active} onClick={() => router.push('/feed/' + (pageNumber + 1))}>NEXT</div>
            </div>
        </div>
    )
}

export const getServerSideProps = async (pageContext) => {
    const pageNumber = pageContext.query.slug
    if(!pageNumber || pageNumber < 1 || pageNumber > 5){
        return{
            props: {
                articles: [],
                pageNumber: 1
            }
        }
    }

    const apiResponse = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=4e75e751f7bb426886857e3abc8293b8&page=${pageNumber}&pageSize=3`)
    const apiResponseJson = await apiResponse.json()
    return{
        props:{
            articles: apiResponseJson.articles,
            pageNumber: parseInt(pageNumber) 
        }
    }
}

export default Feed;