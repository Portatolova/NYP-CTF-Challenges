import java.util.Base64;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import java.security.spec.KeySpec;
import javax.crypto.SecretKey;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

class Main {

    public static void main(String[] args) {
        String input = "c1LsoDXs0MTQLg8PqWS3jDOuBI4jj9YNgwIfc8eemBC8XXCvVW9CScK70hi8i5qT";

        try {
            SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
            KeySpec spec = new PBEKeySpec("90384091234".toCharArray(), "supersecret".getBytes(), 65536, 256);
            SecretKey key = new SecretKeySpec(factory.generateSecret(spec).getEncoded(), "AES");

            IvParameterSpec ivPS = new IvParameterSpec("j5v51ss0p51nful!".getBytes());

            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");

            cipher.init(2, key, ivPS);

            System.out.println(new String(cipher.doFinal(Base64.getDecoder().decode(input))));
        } catch (Exception e) {
            System.out.println(e);
        }
    }
}