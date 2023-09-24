interface Board {
    columns: Map<TypedColumn, Column>
}

type TypedColumn = "todo" | "inprogress" | "done"

interface Column {
    id: TypeColumn,
    todos: Todo[];

}
interface Todo {
    $id  : string;
    $createdAt: string;
    title: string;
    status: TypedColumn;
    image?:Image;
     

}

interface Image {
 bucketId: any;
 fileId: string;

}