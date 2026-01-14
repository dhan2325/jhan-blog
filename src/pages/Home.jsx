import Header from '../components/Header'
import Footer from '../components/Footer'

function Home() {
  return (
    <>
      <Header />
      <div className="root">
        <h2>Hey, my name's Junyoung</h2>
        <div className="border-box">
          <img src="/images/me.jpg" alt="this is me!" style={{ width: '300px', height: '400px', float: 'right' }} />
        </div>
        <div className="text-box">
          I'm a software engineer with interests in building reliable applications and enabling robnotic systems. When I'm not stuck in a Terminal window, I take pride in being mediocre at both bouldering and latte art.
        </div>

        <h3>Quick summary about me:</h3>
        <div className="text-box">
          <ul>
            <li>robotics engineering student at UofT</li>
            <li>former founding engineer at <a href="https://www.kortex.co/">Kortex</a></li>
            <li>conducted undergraduate thesis at <a href="https://crl.utm.utoronto.ca/">Continuum Robotics Laboratory</a></li>
            <li>
              previous software/firmware engineer at <a href="https://www.engdesignlab.com/">EDL</a>
            </li>
            <li>
              previous developer for the planning team at <a href="https://www.autodrive.utoronto.ca/">AuToronto</a>
            </li>
          </ul>
        </div>

        <h3>Some cool things I've worked on:</h3>
        <div className="text-box">
          <ul>
            <li> A RAG pipeline for Kortex's knowledge-base aware AI chat</li>
            <li> An R-CNN based solution for the SVHN dataset (more on that hopefully soon!)</li>
            <li> An offline-first sync engine developed as a django extension</li>
            <li>A <a href="/blog/slicer">slicer</a> for a five-axis 3D printer, completely in <a href="/blog/rust_intro">Rust</a></li>
          </ul>
          Or, you can click <a href="/blog">here</a> for a full list of my blog posts!
        </div>
      </div>
      <Footer />

    </>
  )
}

export default Home 
