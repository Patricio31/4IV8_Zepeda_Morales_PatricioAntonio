import java.util.*;
import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class Examen_primer_parcial {

    
    private List<Double> lista = new ArrayList<>();

    
    public void agregar(double n) {
        lista.add(n);
    }

    
    public double calcularMedia() {
        double suma = 0;
        for (double d : lista) suma += d;
        return suma / lista.size();
    }

    
    public double calcularMediana() {
        Collections.sort(lista);
        int n = lista.size();
        if (n % 2 == 0) {
            return (lista.get(n / 2 - 1) + lista.get(n / 2)) / 2.0;
        } else {
            return lista.get(n / 2);
        }
    }

    
    public String calcularModa() {
        Map<Double, Integer> conteo = new HashMap<>();
        for (double d : lista) {
            conteo.put(d, conteo.getOrDefault(d, 0) + 1);
        }

        double moda = 0;
        int max = 0;
        for (Map.Entry<Double, Integer> entry : conteo.entrySet()) {
            if (entry.getValue() > max) {
                max = entry.getValue();
                moda = entry.getKey();
            }
        }
        return (max > 1) ? String.valueOf(moda) : "No hay moda";
    }

    public static void main(String[] args) {
        Scanner leer = new Scanner(System.in);
        Examen_primer_parcial est = new Examen_primer_parcial();
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd/MM/yyyy");

        System.out.println("--- Media, Moda y Mediana ---");

        
        while (true) {
            System.out.print("Ingrese un número (0 para salir): ");
            try {
                double num = Double.parseDouble(leer.nextLine());
                if (num == 0) break; // Condición de parada
                est.agregar(num);
            } catch (NumberFormatException e) {
                System.out.println("Solo se pueden ingresar valores numéricos.");
            }
        }

        if (est.lista.isEmpty()) {
            System.out.println("No se ingresaron datos suficientes.");
            leer.close();
            return;
        }

        
        System.out.print("\nNombre completo: ");
        String nombre = leer.nextLine();

        LocalDate fechaNac = null;
        
        while (fechaNac == null) {
            System.out.print("Fecha de nacimiento (dd/mm/aaaa): ");
            try {
                fechaNac = LocalDate.parse(leer.nextLine(), dtf);
            } catch (DateTimeParseException e) {
                System.out.println("Formato de fecha incorrecto. Intente de nuevo.");
            }
        }

        
        int edad = Period.between(fechaNac, LocalDate.now()).getYears();

        if (edad >= 18) {
            System.out.println("\n--- REPORTE ESTADÍSTICO ---");
            System.out.println("Usuario: " + nombre);
            System.out.println("Edad: " + edad + " años");
            System.out.printf("Media: %.2f\n", est.calcularMedia());
            System.out.printf("Mediana: %.2f\n", est.calcularMediana());
            System.out.println("Moda: " + est.calcularModa());
        } else {
            System.out.println("\nACCESO DENEGADO: El programa es exclusivo para mayores de edad.");
        }

        
        leer.close();
    }
}