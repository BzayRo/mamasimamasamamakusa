const SUPABASE_URL = "https://ldcrujnzcmaqbgcbdsom.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkY3J1am56Y21hcWJnY2Jkc29tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIwNDA3NjYsImV4cCI6MjEwNzYxNjc2Nn0.XcBYAiWrFSuOtUm3Ldaicbpgt-K9MoAdfOiCU1LFJpI";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const btnFiltrar = document.getElementById('btnFiltrar');
const listaProductos = document.getElementById('listaProductos');

btnFiltrar.addEventListener('click', async () => {
    listaProductos.innerHTML = '<li>Cargando datos del Dark World... ⏳</li>';

    // Consulta avanzada: Filtro por categoría, ordenados por precio ascendente y límite de 5
    const { data, error } = await supabaseClient
        .from('productos')
        .select('*')
        .eq('categoria', 'electronica')
        .order('precio', { ascending: true })
        .limit(5);

    if (error) {
        console.error('Error:', error);
        listaProductos.innerHTML = '<li>[¡Error!] No se pudo acceder al cofre de datos.</li>';
        return;
    }

    listaProductos.innerHTML = '';
    
    if (data.length === 0) {
        listaProductos.innerHTML = '<li>No se encontraron objetos en esta categoría.</li>';
        return;
    }

    data.forEach(prod => {
        const li = document.createElement('li');
        
        const precioFormateado = prod.precio.toLocaleString('es-PY');
        
        li.textContent = `💻 ${prod.nombre} — ${precioFormateado} G (${prod.categoria})`;
        listaProductos.appendChild(li);
    });
});