/*
    SPACE INVADERS
 */

package test;

//Importamos Librerias
import java.awt.Canvas;
import java.awt.Dimension;
import java.awt.Graphics2D;
import java.awt.Color;
import java.awt.event.*;
import java.awt.image.BufferStrategy;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import javax.imageio.ImageIO;
import javax.swing.*;



public class Test {
    /*///////////////////   VARIABLES INICIALES    ///////////////////////////*/
    Bucle bucle = new Bucle();
    
    static JLabel label;
    static final long FLIPDELAY = 500;
    
    // Variables de Imagenes
    static private BufferedImage imgJugador;
    static private BufferedImage imgEnemigo;
    static private BufferedImage imgFondo;
    
    
    //CONDICIONES INICIALES
    //Posicion del jugador 
    static int miposx = 225;
    static int miposy = 450;
    static String movimientopersonaje = "cucu";
    
    //Balas Jugador
    static int[] balaposx;                                                             // Declaramos los array de las posiciones de las balas
    static int[] balaposy;
    static int balasmax = 0;                                                           // ponemos a 0 el contador de balas disparadas;
    static int balasmin = 0;                                                           // contador de balas dentro del terreno de juego
    static boolean[] balaviva;                                                         // variable bool para activar las balas
    static int balastiempo = 30;                                                       // contador de tiempo para el lanzamiento de balas

    //Balas enemigos
    static int[] balaenemigoposx;
    static int[] balaenemigoposy;
    static int balaenemigomax = 0;
    static int balaenemigomin = 0;
    static boolean[] balaenemigoviva;
    int balasenemigotiempo = 0;
    
    //Enemigos
    static public int[] enemigoposx;                                            // almacenan la posicion x ,y de cada uno de los enemigos
    int enemigoposy = 25;                                                       // y comun ya que se mueven en bloque
    static int enemigos = 5;                                                    // numero de enemigos con los que se inicia el nivel 
    int hasganado = (enemigos+1);                                               // contador para saber cuando se han eliminado a todos los enemigos
    
    static boolean[] enemigovivo;                                               //almacena si el enemigo está vivo o no
    String movimientoenemigos = "derecha";                                      // se inicia la variable de la direccion de movimiento usada en movimientoEnemigo()
    
    static int WIDTH = 512;
    static int HEIGHT = 512;
    static BufferStrategy bufferStrategy;
    static JFrame frame;                                                        // Creacion de un marco sobre el que trabajar
    static Canvas canvas;
    
    
    
    /*/////////////////////    FUNCION DE INICIO   ///////////////////////////*/
    public static void inicio(){
        
        System.out.println("Estoy en la funcion de inicio");
        frame = new JFrame("Space Invaders");                                   // Creamos una ventana
        frame.setFocusable(true);
        //frame.grabFocus();
        
        
        
        
        // Creamos panel
        JPanel panel = (JPanel) frame.getContentPane();                         // Creamos un nuevo panel dentro del marco
        panel.setPreferredSize(new Dimension(WIDTH, HEIGHT));                   // Introducimos propiedades del panel
        panel.setLayout(null);                                                  // Inicializamos el layout
        panel.setFocusable(true);                                               // Permitimos que podamos hacer focus
        
        panel.requestFocusInWindow();
        frame.addKeyListener(new KeyboardListener());
        
        
        frame.requestFocus();
        canvas = new Canvas();  
        frame.add(canvas);
        canvas.createBufferStrategy(1);                                         // Creamos una estrategia de buffer
        bufferStrategy = canvas.getBufferStrategy();                            // Asignamos al canvas
        canvas.requestFocus();                                                  // Requerimos el foco del raton
        
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);                   // Cerrar el proceso al salir del programa
        frame.pack();                                                           // Empaquetamos
        frame.setResizable(false);                                              // No permitimos el reescalado
        frame.setVisible(true);                                                 // Hacemos que sea visible
        
        //Adding the keylistener, just like adding any other kind of listener
        frame.addKeyListener(new KeyboardListener());
        
        //Cargamos las imagenes
        String imagePath = "C:\\Users\\Vicente\\Desktop\\SpaceInvadersJava\\SpaceInvadersJava\\src\\test\\";
        try {
            imgJugador=ImageIO.read(new File(imagePath+"jugador.png"));
            imgEnemigo=ImageIO.read(new File(imagePath+"enemigo.png"));
            imgFondo=ImageIO.read(new File(imagePath+"fondo_estrellado.jpg"));
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        
        
        //Inicializamos las variables y arrays
        enemigoposx = new int[10]; 
        enemigoposx[0] = 25;
        enemigoposx[1] = 75;
        enemigoposx[2] = 125;
        enemigoposx[3] = 175;
        enemigoposx[4] = 225;
        enemigoposx[5] = 275;

        enemigovivo = new boolean[enemigos]; 
        for(int i=0; i<=(enemigos-1); i++){
            enemigovivo[i] = true;                                              //inicializa todos en true
        }
        
        // Inicializaciones
        balaenemigoviva = new boolean[1000];
        balaenemigoposx = new int[1000];
        balaenemigoposy = new int[1000];
        //enemigovivo = new boolean[enemigos];
        
        
    }
    
    
    
    /*/////////////          FUNCION MAIN           //////////////////////////*/
    public static void main(String... args) {
        //La funciones principal llama a inicio
        inicio();
        
    }
    
    
    
    /*//////////////       FUNCION ESCUCHADOR DE TECLAS       ////////////////*/
    private static class KeyboardListener implements KeyListener {
        //Methods that dictates what should happen when you press a key
        @Override 
        public void keyPressed(KeyEvent e) {
            int key;
            key = e.getKeyCode();
            if(key == KeyEvent.VK_UP && balastiempo>=30) {
                balaposx[balasmax] = miposx+22;             // coge las coordenadas iniciales de la bala
                balaposy[balasmax] = miposy;
                balaviva[balasmax] = true;                  // activa la bala
                balasmax++;                                 // aumenta el contador de balas totales
                balastiempo = 0;                            // reinicia el contador de tiempo para el proximo disparo
                System.out.println("arriba");
            }
            if(key == KeyEvent.VK_RIGHT){
                movimientopersonaje = "derecha";
                System.out.println("derecha");
            }
            if(key == KeyEvent.VK_LEFT){
                movimientopersonaje = "izquierda";
                System.out.println("izquierda");
            }
        }
        
        @Override public void keyReleased(KeyEvent e) {
            int key;
            key = e.getKeyCode();
            if (key == KeyEvent.VK_RIGHT){movimientopersonaje = "cucu";}
            if (key == KeyEvent.VK_LEFT) {movimientopersonaje = "cucu";}
        }
        
        @Override public void keyTyped(KeyEvent e) {}
    }
    
    
    
    /*////////////////         FUNCION BUCLE        //////////////////////////*/
    private class Bucle implements Runnable {
        boolean stopped = false;
        int number = 0;

        //this is the method that's executed when we call the start()-method on our thread
        long desiredFPS = 100;                                                  // Especificamos los fps
        long desiredDeltaLoop = (1000*1000*1000)/desiredFPS;                    // Calculamos los milisegundos de tasa de refresco
        boolean running = true;                                                 // Variable para comprobar si esta en funcionamiento
        
        public void run() {
            long beginLoopTime;
            long endLoopTime;
            long currentUpdateTime = System.nanoTime();
            long lastUpdateTime;
            long deltaLoop;
        
            while(running){                                                         // Mientras sea cierto que se esta ejecutando
                beginLoopTime = System.nanoTime();                                  // Asigna el nano tiempo del sistema
                render();                                                           // Llamada el metodo de RENDER
                lastUpdateTime = currentUpdateTime;                                 // Actualizacion de la variable
                currentUpdateTime = System.nanoTime();                              // Asignación de un nuevo tiempo
                update((int) ((currentUpdateTime - lastUpdateTime)/(1000*1000)));   // Llamada al metodo de actualizacion
                
                endLoopTime = System.nanoTime();
                deltaLoop = endLoopTime - beginLoopTime;

                if(deltaLoop > desiredDeltaLoop) {                                  // Si lo que has tardado en computar es mayor que los FPS
                    //System.out.println("No llego");
                } else {
                    try {
                        Thread.sleep((desiredDeltaLoop - deltaLoop)/(1000*1000));   // Para la ejecucion (como el SetTimeout)
                    } catch(InterruptedException e){
                        //Do nothing
                    }
                }
            }
        }
        
        public void stop() {
            stopped = true;
        }
    }
    
    
    
    /*////////////////////////////////FUNCION ESPECIFICAS DEL JUEGO///////////////////////////////////////////*/
    //Funcion de RENDER
    private void render() {
        Graphics2D g = (Graphics2D) bufferStrategy.getDrawGraphics();           // Crea un nuevo grafico 2D
        g.clearRect(0, 0, WIDTH, HEIGHT);                                       // Borra el grafico
        render(g);                                                              // Llamada al metodo protegido render
        g.dispose();                                                            // Vacia la memoria
        bufferStrategy.show();                                                  // Muestra el buffer
    }
    
    
    
    //Funcion de ACTUALIZACION
    private double x = 0;                                                       // Creamos una variable para el desplazamiento de las cajas
    protected void update(int deltaTime){                                       // Funcion para actualizar la posicion de las cajas
        x += deltaTime * 0.2;                                                   // Avance en x
        while(x > 500){                                                         // Siempre que la x sea mayor que 500
            x -= 500;                                                           // Reinicia la x
        }
    }
    
    
    
    //Funcion RENDER GRAPHICS
    protected void render(Graphics2D g){                                        // Metodo que realmente dibuja
        //Dibujar Fondo de Pantalla        
        g.drawImage(imgFondo, 0, 0, null);
        
        //ACTUALIZACION DE POSICIONES de jugador, enemigo y balas
        movimientoJugador();                        // funcion para dibugar el movimiento del jugador dentro de los limites
	movimientoEnemigo();
	balasAliens();                              //Las balas del jugador se actualizan en el pintado
        
        //Dibujamos jugador
        g.drawImage(imgJugador, miposx, miposy, null);
        
        //Dibujamos a los enemigos
        for(int i=0; i<=enemigos-1; i++){
            if(enemigovivo[i]){
                g.drawImage(imgEnemigo, enemigoposx[i], enemigoposy, null);
            }
        }
        
        //Dibujamos las balas del jugador
        for(int i = balasmin; i<balasmax; i++){                                 //Comprobamos todas las balas creadas
            balaposy[i] -= 3;
            //Dibujamos las balas si estan dentro del canvas
            if(balaposy[i] > 0) {  
                if(balaviva[i]){
                    g.setColor(Color.WHITE); 
                    g.fillRect(balaposx[i], balaposy[i], 2, 2);
                }
            } else {
                balasmin++; // si no entra dentro del contenedor, no se vuelve a intentar dibujar ya que su posicion sera menor a 0
            }
        }
        
        //Dibujamos las balas enemigas
        for (int i=balaenemigomin; i<balaenemigomax; i++) {
            balaenemigoposy[i] += 3;
            if(balaenemigoposy[i]<470){
                if(balaenemigoviva[i]){
                    g.setColor(Color.GREEN); 
                    g.fillRect(balaenemigoposx[i], balaenemigoposy[i], 2, 2);
                } else {
                    balasmin++;
                }
            }
        }
        
        //Comprobamos si hemos perdido o matado
        hasPerdido();
        matarAlien();
        
        //Aumenta el contador de tiempo para el proximo lanzamiento
        balastiempo++; 
	balasenemigotiempo++;
    }
    
    
    
    //MOVIMIENTO DEL JUGADOR
    public void movimientoJugador(){
        if(movimientopersonaje.equals("derecha")){
            miposx += 3;
        }
        if(movimientopersonaje.equals("izquierda")){
            miposx -= 3;
        }
        //Controlar limites de movimiento
        if(miposx > WIDTH-10){
            miposx = WIDTH-10;
        }
        if(miposx < 10){
            miposx = 10;
        }
    }
    
    public void movimientoEnemigo(){
        //$("#enemigos").html(""); // limpia el html
        
        //Si los enemigos llegan a la izquierda cambian de direccion y bajan una linea
        if(enemigoposx[0] <= 10) {
            movimientoenemigos = "derecha";
            enemigoposy += 45;
        }
        //Si los enemigos llegan a la derecha cambian de direccion y bajan una linea
        if(enemigoposx[enemigos] >= 440) {
            movimientoenemigos = "izquierda";
            enemigoposy += 45;
        }

        if(movimientoenemigos.equals("derecha")){                               // Mueve todos los aliens a la derecha
            for(int i=0; i<=enemigos; i++){
                enemigoposx[i]+=3;
            }
        }
        if(movimientoenemigos.equals("izquierda")){                             // Mueve todos los aliens a la izquierda
            for(int i = 0;i <= enemigos;i++){
                enemigoposx[i]-=3;
            }
        }
    }
    
    

    //Balas Enemigas
    public void balasAliens(){
        if(balasenemigotiempo == 35){
            int random = (int)Math.floor(Math.random()*(enemigos));             // Selecciona un enemigo al azar
            balasenemigotiempo = 0;                                             // Reinicia contador de tiempo de balas
            if(enemigovivo[random]){
                // Activa la bala y le damos posicion
                balaenemigoviva[balaenemigomax] = true;
                balaenemigoposx[balaenemigomax] = enemigoposx[random];
                balaenemigoposy[balaenemigomax] = enemigoposy + 50;
                balaenemigomax++;                                               // Aumenta en uno el contador de balas 
            }
        }
    }
    
    
    
    public void hasPerdido(){
        // Si el enemigo me pasa o me toca, muero
        for(int i=0; i<=enemigos-1; i++){
            if(enemigovivo[i]) {
                if(enemigoposy >= miposy){
                    enemigovivo[i] = false;
                    System.out.println("HAS PERDIDO");
                }
                // Si el enemigo choca conmigo muero
                if(Math.abs(enemigoposx[i]-(miposx+25)) < 25 && Math.abs(enemigoposy-miposy) < 25) {
                    enemigovivo[i] = false;
                    System.out.println("HAS PERDIDO");
                }
            }
        }
        // Si la bala disparada por el enemigo choca conmigo, muero
        for (int i=balaenemigomin; i<balaenemigomax; i++) {
            if(Math.abs((balaenemigoposx[i]+2)-(miposx+22))<25 && Math.abs((miposy+22)-(balaenemigoposy[i]+10))<25){
                if(balaenemigoviva[i]){
                    System.out.println("HAS PERDIDO");
                }
            }
        }
    }
    
    
    
    public void matarAlien(){
        for(int i=balasmin; i<balasmax; i++){                                   // Recorre todas las balas disparadas activas
            for(int j=0; j<=enemigos; j++){                                     // Recorre todos los enemigos
                if(Math.abs(balaposx[i]-(enemigoposx[j]+22))<25 && Math.abs((enemigoposy+22)-balaposy[i])<25){
                    // Si la bala choca con un enemigo y ambos estan activos...
                    if(enemigovivo[j] && balaviva[i]){
                        enemigovivo[j] = false;                                 // Muere el enemigo
                        balaviva[i] = false;                                    // muere la bala
                        hasganado--;                                            // resta uno al contador para saber si estan todos muertos
                        if(hasganado == 0){
                            System.out.println("HAS GANADO");
                        }
                    } else {
                        System.out.println("El enemigo ya estaba muerto");
                    }
                }
            }
        }
    }
}
