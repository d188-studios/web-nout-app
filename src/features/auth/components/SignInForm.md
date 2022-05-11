# Sign In

As a user, I want to sign in to my account.

**Acceptance Criteria:**

-The form should have 'Iniciar Sesión' as the title.
-The form should have a username and password field.

-The username should have 'Nombre de usuario' as a placeholder.
-The username should have the following validation:
  -The username is required. When the user is empty, the error message should be 'El nombre de usuario es requerido'.
  -The username should be at max 32 characters. When the username is too long, the error should be 'El nombre de usuario no puede tener más de 32 caracteres.'

-The password should have 'Contraseña' as a placeholder.
-The password should have the following validation:
  -The password is required. When the password is empty, the error message should be 'La contraseña es requerida'.
  -The password should be at min 6 characters. When the password is too short, the error should be 'La contraseña debe tener al menos 6 caracteres.'

-The form should have a submit button. When the submit button is clicked, the button should display a loading spinner.
-The submit button should have a 'Iniciar Sesión' text.

-The form should have a link to the sign up page that should have 'Registrate' as the text.
-The form should have a link to the forgot password page that should have '¿Olvidaste tu contraseña?' as the text.
