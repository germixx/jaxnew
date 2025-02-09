

export default async function Place ({params}) {
    console.log(params, 'si props')
    const ids = (await params).placeID
    console.log(ids, ' is ')
  return (
    <div className="antialiased">
        <div className="p-4 md:ml-64 h-auto pt-20">
            <div className="mx-auto">
                asdsd {ids}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
            <div className="bg-blue-500 text-white p-6 rounded-lg h-64">Item 1</div>
            <div className="bg-blue-500 text-white p-6 rounded-lg h-64">Item 2</div>
            <div className="bg-blue-500 text-white p-6 rounded-lg h-64">Item 3</div>
            <div className="bg-blue-500 text-white p-6 rounded-lg h-64">Item 4</div>
        </div>
        </div>
        
    </div>
  )
}

