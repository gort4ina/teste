<?php
include 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM users WHERE username='$username' AND password='$password'";
    $result = $conn->query($sql);

    if ($result->num_rows == 1) {
        session_start();
        $_SESSION['username'] = $username;
        header("Location: dashboard.php");
    } else {
        echo "Nome de usuário ou senha incorretos.";
    }
}

$conn->close();
?>

<?php
include 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $fullname = $_POST['fullname'];
    $email = $_POST['email'];

    $sql = "INSERT INTO users (username, password, fullname, email) VALUES ('$username', '$password', '$fullname', '$email')";

    if ($conn->query($sql) === TRUE) {
        echo "Usuário registrado com sucesso.";
    } else {
        echo "Erro ao registrar usuário: " . $conn->error;
    }
}

$conn->close();
?>

<?php
include 'db_connection.php';

// Create
if (isset($_POST['create'])) {
    $productName = $_POST['product_name'];
    $productDescription = $_POST['product_description'];

    $sql = "INSERT INTO products (name, description) VALUES ('$productName', '$productDescription')";

    if ($conn->query($sql) === TRUE) {
        echo "Produto criado com sucesso.";
    } else {
        echo "Erro ao criar produto: " . $conn->error;
    }
}

// Read
if (isset($_GET['read'])) {
    $sql = "SELECT * FROM products";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            echo "ID: " . $row['id'] . " - Nome: " . $row['name'] . " - Descrição: " . $row['description'] . "<br>";
        }
    } else {
        echo "Nenhum produto encontrado.";
    }
}

// Update
if (isset($_POST['update'])) {
    $productId = $_POST['product_id'];
    $productName = $_POST['product_name'];
    $productDescription = $_POST['product_description'];

    $sql = "UPDATE products SET name='$productName', description='$productDescription' WHERE id=$productId";

    if ($conn->query($sql) === TRUE) {
        echo "Produto atualizado com sucesso.";
    } else {
        echo "Erro ao atualizar produto: " . $conn->error;
    }
}

// Delete
if (isset($_POST['delete'])) {
    $productId = $_POST['product_id'];

    $sql = "DELETE FROM products WHERE id=$productId";

    if ($conn->query($sql) === TRUE) {
        echo "Produto excluído com sucesso.";
    } else {
        echo "Erro ao excluir produto: " . $conn->error;
    }
}

$conn->close();
?>
