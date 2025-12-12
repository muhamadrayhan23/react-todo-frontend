import { Page, Text, View, Document, StyleSheet, Font } from "@react-pdf/renderer";

Font.register({
    family: "Courier",
    fonts: [
        { src: "/fonts/Courier.ttf", fontWeight: "normal" },
        { src: "/fonts/Courier.ttf", fontWeight: "bold" },
    ]
})

const styles = StyleSheet.create({
    page: { padding: 20 },
    page: { margin: 20, },
    title: { fontSize: 20, fontFamily: "Courier", marginBottom: 10, padding: 10, fontWeight: "bold" },
    item: { marginBottom: 10, padding: 10 },
    todoText: { fontSize: 14, fontFamily: "Courier" },
    descText: { fontSize: 12, fontFamily: "Courier", color: "#555" },
});

const TodoPdf = ({ todos }) => {

    return (
        <Document>
            <Page style={styles.page}>
                <Text style={styles.title}>Laporan Todo List</Text>

                {todos.map((t) => (
                    <View key={t.id} style={styles.item}>
                        <Text style={[styles.todoText]}>
                            • {t.todo}
                        </Text>
                        <Text style={[styles.descText]}>
                            {t.description}
                        </Text>
                    </View>
                ))}

            </Page>
        </Document>
    );
};

export default TodoPdf;