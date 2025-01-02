import '../styles/Visual.css'

function Visual (){
  return(
    <section id="main-visual">
      <article className='main-img-box'>
        <div><img src="../../public/img/main-visual-02.jpg" alt="" /></div>
      </article>

      <article className='main-visual-text'>
        <div>
          <p>광화문광장 배경의 크리스마스 마켓</p>
          <p>광화문 마켓</p>
          <p>기간 2024.12.13 (금) ~ 2025.01.05 (일)</p>
          <button>자세히 보기</button>
        </div>
      </article>
    </section>
  )

}
  export default Visual;