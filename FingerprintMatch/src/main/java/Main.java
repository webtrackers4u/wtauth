import com.machinezoo.sourceafis.*;
import java.nio.file.*;

public class Main {
    public static void main(String[] args) throws Exception {
        FingerprintTemplate probe = new FingerprintTemplate(
            new FingerprintImage(
                Files.readAllBytes(Paths.get("sample1.bmp")),
                new FingerprintImageOptions().dpi(500)));

        FingerprintTemplate candidate = new FingerprintTemplate(
            new FingerprintImage(
                Files.readAllBytes(Paths.get("sample2.bmp")),
                new FingerprintImageOptions().dpi(500)));

        double score = new FingerprintMatcher(probe).match(candidate);
        boolean matches = score >= 40;

        System.out.println("Score: " + score);
        System.out.println("Match: " + matches);
    }
}
