export default function DataTable({children,title}) {
  return (
    <div>
       <div className="container">
        <div className="homt-content-latest-users">
            <div className="home-content-users-title">
                <span style={{paddingBottom:'30px',display:'inline-block',fontWeight:'bold'}}>
                    لیست <span className="signup">{title}</span>
                </span>
            </div>
            <div className="home-content-users-table">
                {
                    children
                }
            </div>
        </div>
       </div>
    </div>
  )
}
