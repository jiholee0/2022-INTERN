package com.company;

import java.io.*;
import java.util.*;

public class FileReader {

    public List<List<String>> readFile(String path, String name) {
        List<List<String>> list = new ArrayList<List<String>>();
        File file = new File(path);
        BufferedReader br = null;
        String line = "";

        try {
            br = new BufferedReader(new java.io.FileReader(file));
            if (Objects.equals(name, "goods")) { // 그대로
                while ((line = br.readLine()) != null) { // readLine()은 파일에서 개행된 한 줄의 데이터를 읽어온다.
                    List<String> aLine = new ArrayList<String>();
                    String[] lineArr = line.split("\\|"); // 파일의 한 줄을 |로 나누어 배열에 저장 후 리스트로 변환한다.
                    aLine = Arrays.asList(lineArr);
                    list.add(aLine);
                }
            }
            if (Objects.equals(name, "indcd")) {
                while ((line = br.readLine()) != null) { // readLine()은 파일에서 개행된 한 줄의 데이터를 읽어온다.
                    List<String> aLine = new ArrayList<String>();
                    String[] lineArr = line.split("\\|"); // 파일의 한 줄을 |로 나누어 배열에 저장 후 리스트로 변환한다.
                    if (Objects.equals(lineArr[0], "10")) {
                        String[] newArr = new String[]{lineArr[0], lineArr[1], lineArr[3], lineArr[4]};
                        aLine = Arrays.asList(newArr);
                        list.add(aLine);
                    }
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (br != null) {
                    br.close(); // 사용 후 BufferedReader를 닫아준다.
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return list;
    }
}