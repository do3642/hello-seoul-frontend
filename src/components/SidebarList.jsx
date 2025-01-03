import '../styles/SidebarList.css'

function SidebarList() {

  return (
    <>
      <div className="sidebar-list">
        <div className="sidebar-list-left">
          <h4>구 이름</h4>
          <br />
          <p>관광지 이름</p>
          <p>전화번호</p>
        </div>
        <div className="sidebar-list-right">
          <img src="http://placehold.it/100X100" alt="img" />
        </div>
      </div>
    </>
  )
}

export default SidebarList;