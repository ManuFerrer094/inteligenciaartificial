/*
    CHAT BOT INTELIGENCIA ARTIFICIAL

    * Cambios de la version 3:
    * Se quitan acentos y simbolos en las palabras para que la busqueda en la base de datos sea mas fiable
*/

package lenguajenatural3;

import java.awt.Font;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.Normalizer;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;


public class Lenguajenatural3 extends JFrame  {
    JLabel rotulo;
    JTextField tuledices;
    JLabel elteresponde;
    JLabel rotulopregunta;
    JLabel rotulorespuesta;
    JButton enviar;
    JButton correcto;
    JButton incorrecto;
    JPanel panel;
    JLabel idpeso;
    
    int idrespuesta;        // Esta variable se usa tanto en la funcion de busca como para cambiar el peso de la respuesta
    
    
    //CONSTRUCTOR
    public Lenguajenatural3(){
        //Panel
        panel = new JPanel();
        panel.setBounds(0,0,512,512);
        
        //Titulo
        rotulo = new JLabel("CHAT BOT");
        rotulo.setBounds(50,50,450,20);
        rotulo.setFont(rotulo.getFont().deriveFont(18.0f));
        panel.add(rotulo);
        
        //Escribe tu Pregunta
        rotulopregunta = new JLabel("Escribe algo:");
        rotulopregunta.setBounds(30,40,450,20);
        rotulopregunta.setFont(rotulopregunta.getFont().deriveFont(14.0f));
        add(rotulopregunta);
        
        //Campo de texto
        tuledices = new JTextField();
        tuledices.setBounds(30,70,450,20);
        add(tuledices);
        
        //Boton Enviar
        enviar = new JButton("Enviar");
        enviar.setBounds(30,100,75,20);
        add(enviar);
        enviar.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                botonEnviarActionPerformed(evt);
            }
        });
        
        //Panel de Respuesta
        rotulorespuesta = new JLabel("Pedro responde:");
        rotulorespuesta.setBounds(30,160,450,20);
        rotulorespuesta.setFont(rotulorespuesta.getFont().deriveFont(14.0f));
        add(rotulorespuesta);
        
        //Texto devuelto
        elteresponde = new JLabel("Respuesta de pedro");
        elteresponde.setBounds(60,190,450,20);
        Font myFont = new Font("Serif", Font.ITALIC, 14);
        elteresponde.setFont(myFont);
        add(elteresponde);
        
        //Boton OK
        correcto = new JButton("OK");
        correcto.setBounds(30,225,75,20);
        add(correcto);
        correcto.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                botonSupervisadoActionPerformed(evt, 1);
            }
        });
        
        //Boton Incorrecto
        incorrecto = new JButton("NO");
        incorrecto.setBounds(115,225,75,20);
        add(incorrecto);
        incorrecto.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                botonSupervisadoActionPerformed(evt, 0);
            }
        });
        
        //Informacion de actualizacion del peso
        idpeso = new JLabel(" ");
        idpeso.setBounds(30,280,450,20);
        idpeso.setFont(myFont);
        add(idpeso);
        
        //Metemos el panel
        add(panel);
        
        //Parar la ejecucion al cerrar ventana
        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);
    }
    
    
    //Funcion al pulsar Boton Enviar
    private void botonEnviarActionPerformed(java.awt.event.ActionEvent evt) {
        // Al pulsar el boton consultamos la base de datos para dar respuesta a lo que hemos escrito
        try {
            Class.forName("com.mysql.jdbc.Driver");                             // Libreria de java.sql dentro de Java
            
            // Conexion con la base de datos introduciendo toda la info
            Connection conn =  DriverManager.getConnection("jdbc:mysql://localhost:3306/datoschatbot", "root", "") ;
            Statement stmt =  conn.createStatement();                           // En la conexion creo una peticion
            ResultSet rs;                                                       // Array con el resultado de la peticion
            
            ///////////////////  BUSCAMOS PREGUNTA /////////////////////////////
            // Cogemos el texto que introducimos para consultarlo en la base SQL
            String pregunta = tuledices.getText();
            
            // Cogemos la base de datos
            rs = stmt.executeQuery("SELECT * FROM webchat_lines");
            
            int mejorcandidato = 0;
            int puntuacionmejorcandidato = 0;
            // Con el while vamos recorriendo linea a linea la tabla
            while (rs.next()) {
                // Inicializamos puntuacion de esta linea
                int puntuacion = 0;
                
                // Palabras de la Base de Datos
                String[] palabrasgrupo1 = new String[100];
                palabrasgrupo1 = rs.getString("text").split(" ");
                
                // Palabras de mi pregunta
                String[] palabrasgrupo2 = new String[100];
                palabrasgrupo2 = pregunta.split(" ");
                
                // Puntuacion POR PREGUNTA
                // Recorremos ambos grupos de palabras buscando coincidencias
                for (String palabrasgrupo11 : palabrasgrupo1) {
                    for (String palabrasgrupo21 : palabrasgrupo2) {
                        String palabra1 = palabrasgrupo11.toLowerCase(); // Palabra 1
                        String palabra2 = palabrasgrupo21.toLowerCase(); // Palabra 2
                        // Eliminar ACENTOS y dieresis
                        // Separamos los acentos de sus respectivas vocales (descomponemos)
                        palabra1 = Normalizer.normalize(palabra1, Normalizer.Form.NFD);
                        palabra2 = Normalizer.normalize(palabra2, Normalizer.Form.NFD);
                        // Quitar caracteres no ASCII excepto la enie y grados.
                        palabra1 = palabra1.replaceAll("[^\\p{ASCII}(N\u0303)(n\u0303)(\u00B0)]", "");
                        palabra2 = palabra2.replaceAll("[^\\p{ASCII}(N\u0303)(n\u0303)(\u00B0)]", "");
                        // Regresar a la forma compuesta (recomponemos), para poder comparar la enie con la tabla de valores
                        palabra1 = Normalizer.normalize(palabra1, Normalizer.Form.NFC);
                        palabra2 = Normalizer.normalize(palabra2, Normalizer.Form.NFC);
                        //String[] signospunt = new String[9];
                        //signospunt = [".", ",", "!", "?", "\"", "{", "}", "[", "]"];
                        String[] signospunt = {".",",","!","?","\"","'","[","]","{","}","(",")"};
                        for (String signospunt1 : signospunt) {
                            if (palabra1.contains(signospunt1)) {
                                palabra1 = palabra1.replace(signospunt1, "");
                            }
                            if (palabra2.contains(signospunt1)) {
                                palabra2 = palabra2.replace(signospunt1, "");
                            }
                        }
                        // Si hay coincidencia aumentamos la puntuacion de esa frase
                        if (palabra1.equals(palabra2)) {
                            puntuacion++;
                        }
                    }
                }
                
                // Puntuacion POR RESPUESTA
                if (rs.next()) {                                                // Bajamos para coger el peso de la respuesta
                    int valorpeso = rs.getInt("peso");
                    puntuacion *= valorpeso;
                    rs.previous();                                              // Volvemos a dejar el cursor como estaba
                }
                
                // Comprobamos si la puntuacion es la mejor de todas y actualizamos de ser necesario
                if(puntuacion > puntuacionmejorcandidato){
                    puntuacionmejorcandidato = puntuacion;
                    // Guardamos el id del mejor candidato
                    mejorcandidato = rs.getInt("id");
                }
            }
            
            ///////////////////  DAMOS RESPUESTA ///////////////////////////////
            // Bajamos una linea para coger la respuesta
            idrespuesta = mejorcandidato + 1;
            rs = stmt.executeQuery("SELECT * FROM webchat_lines WHERE id = " + idrespuesta);
            rs.next();                                                          // Colocamos cursor en esa linea
            // Escribimos el contenido
            String mensaje = rs.getString("text");
            elteresponde.setText(mensaje);
            
            // Cerramos conexion
            conn.close();
            
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
    }
    
    //Funcion al pulsar boton OK
    private void botonSupervisadoActionPerformed(java.awt.event.ActionEvent evt, int supervisado) {
        try {
            Class.forName("com.mysql.jdbc.Driver");                             // Libreria de java.sql dentro de Java
            
            // Conexion con la base de datos introduciendo toda la info
            Connection conn =  DriverManager.getConnection("jdbc:mysql://localhost:3306/datoschatbot", "root", "") ;
            Statement stmt =  conn.createStatement();                           // En la conexion creo una peticion
            ResultSet rs;                                                       // Array con el resultado de la peticion
            
            // Cogemos la linea del id de la respuesta
            rs = stmt.executeQuery("SELECT * FROM webchat_lines WHERE id = " + idrespuesta);
            rs.next();                                                          // Colocamos cursor en esa linea
            // Cambiamos el valor de la columna "PESO"
            int peso = rs.getInt("peso");
            if (supervisado == 1) {
                peso += 10;
            } else {
                peso -= 10;
            }
            idpeso.setText("(El id: " + idrespuesta + ", actualiza su peso a: " + peso+")");
            
            // Actualizamos la base de datos con el nuevo valor
            stmt.executeUpdate("UPDATE webchat_lines SET peso = "+peso+" WHERE id = "+idrespuesta+"");
            
            // Cerramos conexion
            conn.close();
            
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
    }
    
    //Clase MAIN
    public static void main(String[] args) {
        Lenguajenatural3 ventana = new Lenguajenatural3();
        ventana.setBounds(50, 50, 512, 512);
        ventana.setVisible(true);
    }
}
