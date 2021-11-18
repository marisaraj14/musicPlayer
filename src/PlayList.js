export default function PlayList(props) {

    const listItems = props.songList.map((song, index) =>
        <li key={index.toString()} className="inline-block text-center px-4" onClick={()=>props.setSong(song)}>
            <h1 className="px-2 text-2xl font-bold font-monospace text-blue-300 flex-1">{song.title}</h1>
            <p className="px-2 pb-4 text-xl font-bold flex-1">{song.artist}</p>
        </li>
    );
    return (
        <section className="row-start-4 bg-blue-900 p-2 text-white h-24 mt-2 overflow-auto flex content-center">
            <ul className="justify-center h-24 pb-2">
                {listItems}
            </ul>
        </section>
    );
}