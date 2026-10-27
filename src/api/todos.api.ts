export type ApiTodo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export async function fetchTodos(): Promise<ApiTodo[]> {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/todos?userId=1'
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return (await response.json()) as ApiTodo[];
}
