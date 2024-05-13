export default function (errorCode) {
    switch (errorCode) {
        case 'auth/invalid-email':
            return 'Geçersiz e-posta adresi';

        case 'auth/email-already-exists':
            return 'Kullanıcı zaten kayıtlı';

        case 'auth/user-not-found':
            return 'Kullanıcı bulunamadı';

        case 'auth/wrong-password':
            return 'Geçersiz parola';

        case 'auth/email-already-in-use':
            return 'Böyle bir kullanıcı bulunuyor';

        case 'auth/weak-password':
            return 'Daha güçlü bir parola girin';

        case 'auth/user-disabled':
            return 'Hesabınız engellendi';

        case 'auth/invalid-credential':
            return 'Kimlik bilgileri geçersiz';
        default:
            return errorCode;
    }
}